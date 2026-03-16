import React from "react";

function TravelMateLogo({ size = 44 }) {
  return (
    <svg
      width={size * 2.2}
      height={size}
      viewBox="0 0 220 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Globe */}
      <circle
        cx="40"
        cy="40"
        r="28"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1.8"
      />
      <ellipse
        cx="40"
        cy="40"
        rx="28"
        ry="10"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="12"
        y1="40"
        x2="68"
        y2="40"
        stroke="#e8b84b"
        strokeWidth="1"
        opacity="0.5"
      />
      <ellipse
        cx="40"
        cy="40"
        rx="12"
        ry="28"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Plane */}
      <ellipse
        cx="50"
        cy="26"
        rx="13"
        ry="4"
        fill="#e8b84b"
        transform="rotate(-30 50 26)"
      />
      <polygon points="47,24 39,14 48,22" fill="#e8b84b" opacity="0.9" />
      <polygon points="53,28 62,36 51,27" fill="#e8b84b" opacity="0.9" />
      <polygon points="39,30 34,24 41,28" fill="#e8b84b" opacity="0.85" />

      {/* Flight path */}
      <path
        d="M20 52 Q40 18 62 28"
        fill="none"
        stroke="#e8b84b"
        strokeWidth="1"
        strokeDasharray="3 2.5"
        opacity="0.45"
      />

      {/* Text: Travel */}
      <text
        x="78"
        y="34"
        fontFamily="Georgia, serif"
        fontSize="20"
        fontWeight="700"
        fill="#e8b84b"
        letterSpacing="0.5"
      >
        Travel
      </text>

      {/* Text: Mate */}
      <text
        x="78"
        y="56"
        fontFamily="Georgia, serif"
        fontSize="20"
        fontWeight="400"
        fill="#ffffff"
        letterSpacing="1.5"
      >
        Mate
      </text>
    </svg>
  );
}

export default TravelMateLogo;
