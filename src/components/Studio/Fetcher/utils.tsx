import { EntriesAPI } from "@/src/api/entries/entries";
import type { FetcherProps } from "./types";

export const getDataFetcher = (props: FetcherProps) => {
  const { type } = props;
  switch(type) {
    case "entries":
      return async (contentTypeUid: string) => (await EntriesAPI.getAll({ contentTypeUid })).entries;
    default:
      throw new Error(`Unsupported fetch type: ${type}`);
  }
}