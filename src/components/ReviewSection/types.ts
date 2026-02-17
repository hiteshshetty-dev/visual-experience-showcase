export interface CategoryRating {
  label: string;
  value: number; // 0–5, supports halves (e.g. 4.5, 3.5)
}

export interface ReviewItem {
  detailed_review: string;
  title: string;
  place: string;
}

export interface ReviewSectionProps {
  /** Overall review as a number (e.g. 97 for 97%) */
  overallReview: number;
  /** Short text explaining the number (e.g. "of our guests say they will book again") */
  numberInfo: string;
  /** Category ratings: Service, Cleanliness, Location, Value (each 0–5) */
  categoryRatings: CategoryRating[];
  /** List of guest reviews to rotate through */
  reviews: ReviewItem[];
  /** Time in ms to show each review before switching (0 = no auto-rotation) */
  displayTimeMs?: number;
}
