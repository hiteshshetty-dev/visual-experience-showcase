import type { BaseEntry } from "@contentstack/delivery-sdk";

export type GetAllEntriesArgs = {
  contentTypeUid: string;
}
export interface Entry extends BaseEntry {
  [key: string]: any;
}