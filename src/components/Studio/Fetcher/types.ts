export type FetchType = "entries";

export type FetcherProps = {
  type: FetchType;
  contentTypeUid: string;
  item?: any;
  loader?: any;
  error?: any;
  empty?: any;
}