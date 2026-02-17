'use client';

interface StarRatingProps {
  /** Rating from 0 to 5; supports halves (e.g. 4.5, 3.5) */
  value: number;
  max?: number;
  className?: string;
}

function StarSlot({
  filled,
  half,
  className,
}: {
  filled: boolean;
  half: boolean;
  className?: string;
}) {
  if (filled) {
    return <span className={`text-amber-700 ${className ?? ''}`}>★</span>;
  }
  if (half) {
    return (
      <span className={`relative inline-block w-[1em] ${className ?? ''}`} aria-hidden>
        <span className="text-amber-700/30">★</span>
        <span
          className="absolute inset-0 text-amber-700 overflow-hidden"
          style={{ width: '50%' }}
          aria-hidden
        >
          ★
        </span>
      </span>
    );
  }
  return <span className={`text-amber-700/30 ${className ?? ''}`}>★</span>;
}

export function StarRating({ value, max = 5, className = '' }: StarRatingProps) {
  const clamped = Math.min(max, Math.max(0, value));
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: max }, (_, i) => {
        const threshold = i + 1;
        const halfThreshold = i + 0.5;
        const filled = clamped >= threshold;
        const half = !filled && clamped >= halfThreshold;
        return (
          <StarSlot key={i} filled={filled} half={half} />
        );
      })}
    </span>
  );
}
