import { EntriesAPI } from "@/src/api/entries/entries";
import type { FetcherProps } from "./types";
import { GetAllEntriesArgs, GetAllEntriesByTaxonomyArgs } from "@/src/api/entries/types";

export const getDataFetcher = (props: FetcherProps) => {
  const { type, variant } = props;
  const variants = variant?.split(',') ?? [];
  console.log(variants);
  switch(type) {
    case "entries":
      return async (args: GetAllEntriesArgs) => (variants.length > 0 ? await EntriesAPI.getAllWithVariants({...args, variants}) : await EntriesAPI.getAll(args)).entries;
    case "entries-of-taxonomy":
      return async (args: GetAllEntriesByTaxonomyArgs) => (await EntriesAPI.getAllByTaxonomy(args)).entries;
    default:
      throw new Error(`Unsupported fetch type: ${type}`);
  }
}