import stack from "@/src/livepreview";
import type { Entry, GetAllEntriesArgs } from "./types";

async function getAll(args: GetAllEntriesArgs) {
  const { contentTypeUid } = args;

  const query = stack.contentType(contentTypeUid).entry();

  return await query.find<Entry[]>();
}

export const EntriesAPI = {
  getAll,
}