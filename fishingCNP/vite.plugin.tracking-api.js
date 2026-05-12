/**
 * API tracking — persistance Supabase (fonctionne en dev ET sur Render).
 */
import crypto from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const STAGE = {
  EMAIL_ENTERED: 'email_entered',
  SIGNIN_ATTEMPTED: 'signin_attempted',
  COMPLETED: 'completed',
}

const STAGE_RANK = {
  [STAGE.EMAIL_ENTERED]: 1,
  [STAGE.SIGNIN_ATTEMPTED]: 2,
  [STAGE.COMPLETED]: 3,
}

function bumpStage(current, next) {
  return (STAGE_RANK[next] ?? 0) > (STAGE_RANK[current] ?? 0) ? next : current
}

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  console.log('[tracking-api] SUPABASE_URL:', url ? 'OK' : 'MANQUANT')
  console.log('[tracking-api] SUPABASE_ANON_KEY:', key ? 'OK' : 'MANQUANT')
  if (!url || !key) throw new Error('[tracking-api] SUPABASE_URL ou SUPABASE_ANON_KEY manquant')
  return createClient(url, key)
}

function deviceHint(ua) {
  if (!ua || typeof ua !== 'string') return 'Inconnu'
  const mobile = /Mobile|Android|iPhone|iPad/i.test(ua)
  let browser = 'Navigateur'
  if (/Edg/i.test(ua)) browser = 'Edge'
  else if (/Chrome/i.test(ua)) browser = 'Chrome'
  else if (/Firefox/i.test(ua)) browser = 'Firefox'
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari'
  let os = ''
  if (/Windows NT/i.test(ua)) os = 'Windows'
  else if (/Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
  else if (/Linux/i.test(ua)) os = 'Linux'
  return `${mobile ? 'Mobile' : 'Desktop'} · ${browser}${os ? ` · ${os}` : ''}`
}

function normalizeEmail(email) {
  return String(email ?? '').trim().toLowerCase()
}

async function readJsonBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

function validateTrackPayload(body) {
  if (!body || typeof body !== 'object') return 'invalid_json'
  const { type, visitorId, email } = body
  if (type === 'visit') {
    if (typeof visitorId !== 'string' || !visitorId.trim()) return 'missing_visitor_id'
    return null
  }
  if (['next', 'signin', 'complete'].includes(type)) {
    if (!normalizeEmail(email)) return 'missing_email'
    return null
  }
  if (!type) return 'missing_type'
  return 'unknown_type'
}

// ─── Helpers Supabase ────────────────────────────────────────────────────────

async function getSnapshot(sb) {
  const { data: rows, error } = await sb
    .from('tracking')
    .select('*')
    .order('created_at', { ascending: true })

  console.log('[tracking-api] getSnapshot rows:', rows?.length ?? 0, 'error:', error)

  if (!rows || rows.length === 0) {
    return {
      schemaVersion: 1,
      stats: {
        totalVisitors: 0,
        nextClicks: 0,
        signInClicks: 0,
        completedFlows: 0,
        lastInteractionAt: null,
      },
      visitorIds: [],
      participants: [],
    }
  }

  const visitorIds = [...new Set(
    rows.filter(r => r.step === 'visit').map(r => r.visitor_id).filter(Boolean)
  )]

  const participantsMap = new Map()

  for (const row of rows) {
    if (row.step === 'visit') continue
    const em = normalizeEmail(row.email)
    if (!em) continue
    if (!participantsMap.has(em)) {
      participantsMap.set(em, {
        id: row.id,
        email: em,
        stage: row.step,
        firstSeenAt: row.created_at,
        updatedAt: row.created_at,
        userAgent: row.user_agent ?? '',
        deviceHint: row.device_hint ?? 'Inconnu',
      })
    } else {
      const p = participantsMap.get(em)
      p.stage = bumpStage(p.stage, row.step)
      p.updatedAt = row.created_at
      if (row.user_agent) {
        p.userAgent = row.user_agent
        p.deviceHint = row.device_hint ?? deviceHint(row.user_agent)
      }
    }
  }

  const nextClicks     = rows.filter(r => r.step === 'next').length
  const signInClicks   = rows.filter(r => r.step === 'signin').length
  const completedFlows = rows.filter(r => r.step === 'complete').length
  const lastRow        = rows[rows.length - 1]

  return {
    schemaVersion: 1,
    stats: {
      totalVisitors: visitorIds.length,
      nextClicks,
      signInClicks,
      completedFlows,
      lastInteractionAt: lastRow?.created_at ?? null,
    },
    visitorIds,
    participants: [...participantsMap.values()],
  }
}

// ─── Handler principal ───────────────────────────────────────────────────────

export function trackingApiPlugin() {
  let queue = Promise.resolve()
  function withLock(fn) {
    const task = queue.then(fn)
    queue = task.catch(() => {})
    return task
  }

  async function handle(req, res) {
    const host = req.headers.host ?? 'localhost'
    const url = new URL(req.url ?? '/', `http://${host}`)
    const pathname = url.pathname

    const sendJson = (code, body) => {
      res.statusCode = code
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(body))
    }

    try {
      const sb = getSupabase()

      // ── POST /api/track ──────────────────────────────────────────────────
      if (pathname === '/api/track' && req.method === 'POST') {
        const body = await readJsonBody(req)
        const err = validateTrackPayload(body)
        if (err) return sendJson(400, { ok: false, error: err })

        const { type, visitorId, email, userAgent } = body
        const now = new Date().toISOString()
        const ua = typeof userAgent === 'string' ? userAgent : ''

        console.log('[tracking-api] track type:', type, 'email:', email ?? visitorId)

        await withLock(async () => {
          if (type === 'visit') {
            const { error } = await sb.from('tracking').insert({
              id: crypto.randomUUID(),
              visitor_id: String(visitorId).trim(),
              step: 'visit',
              created_at: now,
            })
            console.log('[tracking-api] insert visit:', error ?? 'OK')
          } else {
            const em = normalizeEmail(email)

              if (!em) {
                console.log('[tracking-api] missing email', { type, email })
                return sendJson(400, { ok: false, error: 'missing_email' })
              }

              const { error } = await sb.from('tracking').insert({
                id: crypto.randomUUID(),
                email: em,
                step: type,
                user_agent: ua,
                device_hint: deviceHint(ua),
                created_at: now,
              })

              console.log('[tracking-api] insert', type, ':', error ?? 'OK')
          }
        })

        return sendJson(200, { ok: true })
      }

      // ── GET /api/dashboard/snapshot ──────────────────────────────────────
      if (pathname === '/api/dashboard/snapshot' && req.method === 'GET') {
        const data = await getSnapshot(sb)
        return sendJson(200, { ok: true, data })
      }

      // ── POST /api/dashboard/reset ────────────────────────────────────────
      if (pathname === '/api/dashboard/reset' && req.method === 'POST') {
        await withLock(async () => {
          const { error } = await sb.from('tracking').delete().neq('id', '00000000-0000-0000-0000-000000000000')
          console.log('[tracking-api] reset:', error ?? 'OK')
        })
        return sendJson(200, { ok: true })
      }

      sendJson(404, { ok: false, error: 'not_found' })
    } catch (e) {
      console.error('[tracking-api]', e)
      sendJson(500, { ok: false, error: 'server_error' })
    }
  }

  return {
    name: 'tracking-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api')) return next()
        void handle(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api')) return next()
        void handle(req, res)
      })
    },
  }
}