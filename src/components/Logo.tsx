export function TaklaLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="40" cy="40" r="38" fill="#0a3d2e" stroke="#c4a35a" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="32" fill="#0d4a38" stroke="#c4a35a" strokeWidth="1" />
      {/* Stylized eagle / thunderbird */}
      <path
        d="M40 14c-2 6-4 10-8 14 4 1 8 2 8 2s4-1 8-2c-4-4-6-8-8-14z"
        fill="#e8d5a3"
      />
      <path
        d="M40 28c-10 2-18 8-22 16 6-2 14-2 22-2s16 0 22 2c-4-8-12-14-22-16z"
        fill="#d4b87a"
      />
      <path
        d="M18 44c8 4 14 10 16 18-2-8 0-14 6-18-6 4-8 10-6 18 2-8 8-14 16-18-8 2-14 6-16 12-2-6-8-10-16-12z"
        fill="#c4a35a"
      />
      <path
        d="M40 30c-3 8-4 16-2 26 1-8 3-14 2-26 2 10 4 16 2 26 2-10 1-18-2-26z"
        fill="#f0e0b0"
      />
      <circle cx="36" cy="26" r="1.5" fill="#0a3d2e" />
      <circle cx="44" cy="26" r="1.5" fill="#0a3d2e" />
    </svg>
  );
}

export function EagleWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M100 20c-5 15-10 25-20 35 10 2 20 5 20 5s10-3 20-5c-10-10-15-20-20-35z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M100 55c-25 5-45 20-55 40 15-5 35-5 55-5s40 0 55 5c-10-20-30-35-55-40z"
        fill="currentColor"
      />
      <path
        d="M45 95c20 10 35 25 40 45-5-20 0-35 15-45-15 10-20 25-15 45 5-20 20-35 40-45-20 5-35 15-40 30-5-15-20-25-40-30z"
        fill="currentColor"
      />
      <path
        d="M100 60c-8 20-10 40-5 65 2-20 8-35 5-65 5 25 10 40 5 65 5-25 2-45-5-65z"
        fill="currentColor"
      />
    </svg>
  );
}
