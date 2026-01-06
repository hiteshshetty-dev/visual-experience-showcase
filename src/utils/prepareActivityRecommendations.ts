import { unstable_cache } from "next/cache";
import { fetchRecommendedActivities } from "./fetchRecommendedActivities";
import { EmbeddedItem } from "@contentstack/utils/dist/types/Models/embedded-object";
import { addEditableTags } from "@contentstack/utils";
import { RECOMMENDATION_REVALIDATE_INTERVAL } from "../constants/lytics.constants";

export async function prepareActivityRecommendations({
  userId,
  url,
  locale,
}: {
  userId: string;
  url: string;
  locale: string;
}) {
  let packagesData = {};
  if (url.endsWith("/activities") || url.endsWith("/activities/")) {
    
    // Cache the fetch operation per user and locale
    const getCachedRecommendedPackages = unstable_cache(
      async (userId: string, locale: string) => {
        return await fetchRecommendedActivities({ userId });
      },
      ["recommended-activities", userId, locale || "default"],
      {
        revalidate: RECOMMENDATION_REVALIDATE_INTERVAL,
        tags: [`activities-${userId}-${locale || "default"}`],
      }
    );

    const { recommendedPackages, otherPackages } =
      await getCachedRecommendedPackages(userId, locale || "default");

    const recommendedPackagesEntries = (recommendedPackages.entries ||
      []) as EmbeddedItem[];
    const otherPackagesEntries = (otherPackages.entries ||
      []) as EmbeddedItem[];

    recommendedPackagesEntries.forEach((packageItem: EmbeddedItem) => {
      addEditableTags(packageItem, "activity", true);
    });

    otherPackagesEntries.forEach((packageItem: EmbeddedItem) => {
      addEditableTags(packageItem, "activity", true);
    });

    packagesData = {
      recommendedPackages: recommendedPackagesEntries,
      otherPackages: otherPackagesEntries,
      locale,
    };
  } else if (url.includes("/activities")) {
    packagesData = {
      backToPackagesUrl: `/${locale}/activities`,
    };
  }
  return packagesData;
}
