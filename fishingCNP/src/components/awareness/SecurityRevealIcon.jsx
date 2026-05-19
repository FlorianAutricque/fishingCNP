export function SecurityRevealIcon({ className = '' }) {
  return (
    <div
      className={`flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(59,130,246,0.22)_0%,rgba(99,102,241,0.12)_100%)] ring-1 ring-white/12 ${className}`}
      aria-hidden
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#93c5fd]"
      >
        <path
          d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3Zm0 18.5c-3.54-.89-6-4.52-6-8.41V6.39l6-2.25 6 2.25v5.7c0 3.89-2.46 7.52-6 8.41Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="m11 14.17-2.83-2.83 1.06-1.06L11 12l4.24-4.24 1.06 1.06L11 14.17Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
