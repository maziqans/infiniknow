"use client"

export function InfiniKnowLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left C shape */}
      <path
        d="M20 8C12 8 6 14 6 22C6 30 12 36 20 36C24 36 27 34 29 31"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="text-white"
      />
      {/* Right C shape (flipped) */}
      <path
        d="M40 8C48 8 54 14 54 22C54 30 48 36 40 36C36 36 33 34 31 31"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="text-white"
      />
      {/* Center hexagon */}
      <polygon
        points="30,12 38,17 38,27 30,32 22,27 22,17"
        fill="#DC143C"
        className="drop-shadow-sm"
      />
      {/* Infinity symbol overlay hint */}
      <path
        d="M26 22C26 20 28 18 30 18C32 18 34 20 34 22C34 24 32 26 30 26C28 26 26 24 26 22"
        fill="white"
        opacity="0.9"
      />
    </svg>
  )
}
