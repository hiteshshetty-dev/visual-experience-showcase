import stack from "@/src/livepreview";
import type { Entry, GetAllEntriesArgs, GetAllEntriesByTaxonomyArgs, GetAllEntriesByVariantArgs } from "./types";
import { TaxonomyQueryOperation } from "@contentstack/delivery-sdk";

async function getAll(args: GetAllEntriesArgs) {
  const { contentTypeUid } = args;
  const query = stack.contentType(contentTypeUid).entry();
  return await query.find<Entry[]>();
}

async function getAllByTaxonomy(args: GetAllEntriesByTaxonomyArgs) {
  const { contentTypeUid, taxonomyUid, termUid } = args;
  const contentTypeQuery = stack.contentType(contentTypeUid).entry().query({
    '_content_type_uid': contentTypeUid,
  });
  const taxonomyQuery = stack.taxonomy().where(`taxonomies.${taxonomyUid}`, TaxonomyQueryOperation.EQ_BELOW, termUid);
  return await taxonomyQuery.and(contentTypeQuery).find<Entry[]>();
}

async function getAllWithVariants(args: GetAllEntriesByVariantArgs) {
  const { contentTypeUid, variants } = args;
  const query = stack.contentType(contentTypeUid).entry().variants(variants);
  return await query.find<Entry[]>();
}

export const EntriesAPI = {
  getAll,
  getAllByTaxonomy,
  getAllWithVariants
}