'use client';

export interface SpinnerProps {
  /** Fill/stroke color for the spinner (e.g. hex, rgb, or CSS color name) */
  color?: string;
  /** Optional size in pixels */
  size?: number;
  /** Stroke thickness of the loader ring (in pixels) */
  thickness?: number;
  /** Optional additional class names */
  className?: string;
}

const DEFAULT_COLOR = '#3b82f6';
const DEFAULT_SIZE = 40;
const DEFAULT_THICKNESS = 3;

const Spinner = (props: SpinnerProps) => {
  const {
    color = DEFAULT_COLOR,
    size = DEFAULT_SIZE,
    thickness = DEFAULT_THICKNESS,
    className = '',
  } = props;
  
  console.log("🚀 ~ Spinner ~ thickness:", props)
  return (
    <div
      className={className}
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
        style={{ color }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray="32 56"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};

export default Spinner;
