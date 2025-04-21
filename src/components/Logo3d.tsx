
/** Lupa 3D SVG, estilizada em preto */
const Logo3d = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Logo Lupa 3D"
  >
    <defs>
      <radialGradient id="lupa-fundo" cx="50%" cy="50%" r="60%" fx="55%" fy="55%">
        <stop offset="0%" stopColor="#fafafa" />
        <stop offset="100%" stopColor="#111" />
      </radialGradient>
      <linearGradient id="handle-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#444" />
        <stop offset="100%" stopColor="#000" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0.5" dy="2" stdDeviation="2" floodColor="#222" />
      </filter>
    </defs>
    <ellipse
      cx="27"
      cy="28"
      rx="18"
      ry="18"
      fill="url(#lupa-fundo)"
      stroke="#161616"
      strokeWidth="3"
      filter="url(#shadow)"
    />
    <ellipse
      cx="27"
      cy="28"
      rx="13"
      ry="13"
      fill="#fff"
      fillOpacity="0.7"
    />
    <rect
      x="38"
      y="38"
      width="13"
      height="4"
      rx="2"
      transform="rotate(43 38 38)"
      fill="url(#handle-grad)"
      filter="url(#shadow)"
    />
    <ellipse
      cx="27"
      cy="28"
      rx="18"
      ry="18"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      opacity="0.6"
    />
  </svg>
);

export default Logo3d;
