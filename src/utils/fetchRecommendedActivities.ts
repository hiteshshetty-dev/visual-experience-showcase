import { getContentRecommendation } from "@/src/api/lytics/getContentRecommendation";
import stack from "@/src/studio";
import { MAX_RECOMMENDATIONS } from "@/src/constants/lytics.constants";

export async function fetchRecommendedActivities({
  userId,
}: {
  userId: string;
}) {
  const entryUids = await fetchRecommendedActivitiesFromLytics({ userId });
  return getRecommendedActivitiesEntries({ entryUids });
}

async function getRecommendedActivitiesEntries({
  entryUids,
}: {
  entryUids: string[];
}) {
  const recommendedPackages = await stack
    .contentType("activity")
    .entry()
    .query()
    .containedIn("uid", entryUids)
    .find();

  const otherPackages = await stack
    .contentType("activity")
    .entry()
    .query()
    .notContainedIn("uid", entryUids)
    .find();

  return {
    recommendedPackages,
    otherPackages,
  };
}

async function fetchRecommendedActivitiesFromLytics({
  userId,
}: {
  userId: string;
}): Promise<string[]> {
  try {
    const response = await getContentRecommendation({
      fieldName: "userId",
      fieldValue: userId,
      query: {
        rank: "affinity",
        contentsegment: "activities",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Lytics API error: ${response.status} ${response.statusText}`
      );
    }

    const lyticsData = (await response.json()).data;
    return lyticsData
      .map((item: { contentstack_uid: string }) => item.contentstack_uid)
      .filter((uid: string) => uid !== undefined)
      .slice(0, MAX_RECOMMENDATIONS);
  } catch (error) {
    console.error("Error fetching recommended packages from Lytics:", error);
    return [];
  }
}
