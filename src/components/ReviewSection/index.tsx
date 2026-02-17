'use client';

import { useState, useEffect } from 'react';
import { StarRating } from './StarRating';
import type { ReviewSectionProps } from './types';

export function ReviewSection({
  overallReview,
  numberInfo,
  categoryRatings,
  reviews,
  displayTimeMs = 5000,
}: ReviewSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasReviews = Array.isArray(reviews) && reviews.length > 0;
  const currentReview = hasReviews ? reviews[currentIndex] : null;

  useEffect(() => {
    if (!hasReviews || reviews.length <= 1 || !displayTimeMs || displayTimeMs <= 0) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % reviews.length);
    }, displayTimeMs);
    return () => clearInterval(id);
  }, [hasReviews, reviews.length, displayTimeMs]);

  const categories = Array.isArray(categoryRatings) ? categoryRatings : [];

  return (
    <section
      className="w-full max-w-8xl mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8"
      style={{ backgroundColor: 'rgb(240, 249, 255)' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: overall number + category ratings */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span
              className="font-[var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl text-amber-800"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              {overallReview}%
            </span>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 font-sans">
              {numberInfo}
            </p>
          </div>
          <div
            className="h-px w-full max-w-[200px] my-6"
            style={{ backgroundColor: 'rgb(180, 140, 100)' }}
          />
          <ul className="space-y-3">
            {categories.map((cat, i) => (
              <li key={i} className="flex items-center gap-3">
                <StarRating value={cat.value} className="shrink-0" />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-neutral-600">
                  {cat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: rotating testimonial */}
        <div className="flex flex-col min-h-[200px]">
          <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-600 mb-4">
            What people are saying
          </h3>
          {currentReview ? (
            <>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6">
                {currentReview.detailed_review}
              </p>
              <div
                className="h-px w-full max-w-[120px] mb-4"
                style={{ backgroundColor: 'rgb(180, 140, 100)' }}
              />
              <p className="font-semibold text-neutral-800 text-base sm:text-lg">
                {currentReview.title}
              </p>
              <p className="text-xs uppercase tracking-wider text-neutral-500 mt-0.5">
                {currentReview.place}
              </p>
              {reviews.length > 1 && (
                <div className="flex gap-1.5 mt-6" aria-label="Review progress">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-colors ${
                        i === currentIndex
                          ? 'bg-amber-700 w-6'
                          : 'bg-amber-700/30 w-1.5 hover:bg-amber-700/50'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                      aria-current={i === currentIndex ? 'true' : undefined}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-neutral-500 text-sm">No reviews to display.</p>
          )}
        </div>
      </div>
    </section>
  );
}
