import type { BaseEntry } from "@contentstack/delivery-sdk";

export type GetAllEntriesArgs = {
  contentTypeUid: string;
}

export type GetAllEntriesByTaxonomyArgs = {
  contentTypeUid: string;
  taxonomyUid: string;
  termUid: string;
}

export type GetAllEntriesByVariantArgs = {
  contentTypeUid: string;
  variants: string[];
}

export interface Entry extends BaseEntry {
  [key: string]: any;
}