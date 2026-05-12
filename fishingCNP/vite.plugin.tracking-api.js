/**
 * API locale pour le tracking (dev + vite preview) — persistance JSON dans /data/tracking.json.
 */
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'tracking.json')

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
  const nextRank = STAGE_RANK[next] ?? 0
  const curRank = STAGE_RANK[current] ?? 0
  return nextRank > curRank ? next : current
}

function emptyStore() {
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

function deviceHint(ua) {
  if (!ua || typeof ua !== 'string') return 'Inconnu'
  const mobile = /Mobile|Android|iPhone|iPad/i.test(ua)
  let browser = 'Navigateur'
  if (/Edg/i.test(ua)) browser = 'Edge'
  else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome'
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

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

async function readStore() {
  await ensureDataDir()
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') throw new Error('invalid root')
    return normalizeStore(parsed)
  } catch {
    const fresh = emptyStore()
    await writeStore(fresh)
    return fresh
  }
}

function normalizeStore(parsed) {
  const base = emptyStore()
  base.stats = { ...base.stats, ...(parsed.stats ?? {}) }
  base.visitorIds = Array.isArray(parsed.visitorIds) ? parsed.visitorIds : []
  base.participants = Array.isArray(parsed.participants) ? parsed.participants : []
  return base
}

async function writeStore(data) {
  await ensureDataDir()
  const tmp = `${DATA_FILE}.${crypto.randomBytes(6).toString('hex')}.tmp`
  await fs.writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  await fs.rename(tmp, DATA_FILE)
}

function normalizeEmail(email) {
  return String(email ?? '')
    .trim()
    .toLowerCase()
}

async function readJsonBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** @param {unknown} body */
function validateTrackPayload(body) {
  if (!body || typeof body !== 'object') return 'invalid_json'
  const { type, visitorId, email } = body
  if (type === 'visit') {
    if (typeof visitorId !== 'string' || !visitorId.trim()) return 'missing_visitor_id'
    return null
  }
  if (type === 'next' || type === 'signin' || type === 'complete') {
    if (!normalizeEmail(email)) return 'missing_email'
    return null
  }
  if (!type) return 'missing_type'
  return 'unknown_type'
}

export function trackingApiPlugin() {
  let queue = Promise.resolve()

  function withLock(fn) {
    const task = queue.then(fn)
    queue = task.catch(() => {})
    return task
  }

  /**
   * @param {import('connect').IncomingMessage} req
   * @param {import('node:http').ServerResponse} res
   */
  async function handle(req, res) {
    const host = req.headers.host ?? 'localhost'
    const url = new URL(req.url ?? '/', `http://${host}`)
    const pathname = url.pathname

    /** @param {number} code @param {unknown} body */
    const sendJson = (code, body) => {
      res.statusCode = code
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(body))
    }

    try {
      if (pathname === '/api/track' && req.method === 'POST') {
        const body = await readJsonBody(req)
        const validationError = validateTrackPayload(body)
        if (validationError) {
          sendJson(400, { ok: false, error: validationError })
          return
        }

        // Ne jamais traiter un éventuel champ mot de passe — ignoré volontairement.
        const { type, visitorId, email, userAgent } = /** @type {{type:string;visitorId?:string;email?:string;userAgent?:string}} */ (
          body
        )

        await withLock(async () => {
          const store = await readStore()
          const now = new Date().toISOString()
          store.stats.lastInteractionAt = now

          if (type === 'visit') {
            const vid = String(visitorId).trim()
            if (!store.visitorIds.includes(vid)) {
              store.visitorIds.push(vid)
              store.stats.totalVisitors += 1
            }
          } else if (type === 'next') {
            const em = normalizeEmail(email)
            store.stats.nextClicks += 1
            const ua = typeof userAgent === 'string' ? userAgent : ''
            const hint = deviceHint(ua)
            let p = store.participants.find((x) => normalizeEmail(x.email) === em)
            if (!p) {
              p = {
                id: crypto.randomUUID(),
                email: em,
                stage: STAGE.EMAIL_ENTERED,
                firstSeenAt: now,
                updatedAt: now,
                userAgent: ua,
                deviceHint: hint,
              }
              store.participants.push(p)
            } else {
              p.stage = bumpStage(p.stage, STAGE.EMAIL_ENTERED)
              p.updatedAt = now
              if (ua && ua !== p.userAgent) {
                p.userAgent = ua
                p.deviceHint = hint
              }
            }
          } else if (type === 'signin') {
            const em = normalizeEmail(email)
            store.stats.signInClicks += 1
            const ua = typeof userAgent === 'string' ? userAgent : ''
            const hint = deviceHint(ua)
            let p = store.participants.find((x) => normalizeEmail(x.email) === em)
            if (!p) {
              p = {
                id: crypto.randomUUID(),
                email: em,
                stage: STAGE.SIGNIN_ATTEMPTED,
                firstSeenAt: now,
                updatedAt: now,
                userAgent: ua,
                deviceHint: hint,
              }
              store.participants.push(p)
            } else {
              p.stage = bumpStage(p.stage, STAGE.SIGNIN_ATTEMPTED)
              p.updatedAt = now
              if (ua && ua !== p.userAgent) {
                p.userAgent = ua
                p.deviceHint = hint
              }
            }
          } else if (type === 'complete') {
            const em = normalizeEmail(email)
            store.stats.completedFlows += 1
            let p = store.participants.find((x) => normalizeEmail(x.email) === em)
            if (!p) {
              p = {
                id: crypto.randomUUID(),
                email: em,
                stage: STAGE.COMPLETED,
                firstSeenAt: now,
                updatedAt: now,
                userAgent: '',
                deviceHint: 'Inconnu',
              }
              store.participants.push(p)
            } else {
              p.stage = bumpStage(p.stage, STAGE.COMPLETED)
              p.updatedAt = now
            }
          }

          await writeStore(store)
        })

        sendJson(200, { ok: true })
        return
      }

      if (pathname === '/api/dashboard/snapshot' && req.method === 'GET') {
        await withLock(async () => {
          const store = await readStore()
          sendJson(200, { ok: true, data: store })
        })
        return
      }

      if (pathname === '/api/dashboard/reset' && req.method === 'POST') {
        await withLock(async () => {
          const fresh = emptyStore()
          await writeStore(fresh)
          sendJson(200, { ok: true })
        })
        return
      }

      sendJson(404, { ok: false, error: 'not_found' })
    } catch (e) {
      sendJson(500, { ok: false, error: 'server_error' })
      // eslint-disable-next-line no-console -- diagnostic minimal serveur
      console.error('[tracking-api]', e)
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
