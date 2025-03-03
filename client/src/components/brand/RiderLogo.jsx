import PropTypes from "prop-types";

const RiderLogo = ({ width = 300, height = 100, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 100"
      width={width}
      height={height}
      className={className}
    >
      {/* Background */}
      <rect
        width="300"
        height="100"
        rx="10"
        fill="#111827"
        stroke="#374151"
        strokeWidth="1"
      />

      {/* Map grid lines suggestion */}
      <path
        d="M20 20 H280 M20 40 H280 M20 60 H280 M20 80 H280"
        stroke="#374151"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      />
      <path
        d="M40 10 V90 M80 10 V90 M120 10 V90 M160 10 V90 M200 10 V90 M240 10 V90"
        stroke="#374151"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      />

      {/* Route line */}
      <path
        d="M60 65 C100 30, 160 75, 220 40"
        stroke="#22c55e"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Origin point */}
      <circle cx="60" cy="65" r="5" fill="#22c55e" />

      {/* Destination point */}
      <circle cx="220" cy="40" r="5" fill="#22c55e" />

      {/* Car icon suggestion */}
      <rect x="145" y="50" width="10" height="6" rx="2" fill="#f9fafb" />

      {/* Main text */}
      <text
        x="150"
        y="70"
        fontFamily="sans-serif"
        fontSize="36"
        fontWeight="800"
        textAnchor="middle"
        fill="#f9fafb"
      >
        Rider
      </text>

      {/* Tagline */}
      <text
        x="150"
        y="85"
        fontFamily="sans-serif"
        fontSize="12"
        fontWeight="300"
        textAnchor="middle"
        fill="#9ca3af"
      >
        Your ride, on demand
      </text>
    </svg>
  );
};

RiderLogo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default RiderLogo;
