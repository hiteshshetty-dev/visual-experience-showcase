export type FetchType = "entries" | "entries-of-taxonomy";

export type FetcherProps = {
  type: FetchType;
  contentTypeUid?: string;
  taxonomyUid?: string;
  termUid?: string;
  item?: any;
  loader?: any;
  error?: any;
  empty?: any;
  variant?: string;
}