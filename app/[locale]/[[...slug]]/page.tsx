import Footer from "@/src/components/Footer";
import stack, { studioClient } from "@/src/studio";
import ComposableStudioClient from "@/src/studio/composable-component";
import Header from "@/src/components/Header";
import { notFound } from "next/navigation";
import {
  extractStyles,
  StudioComponentSpecOptions,
} from "@contentstack/studio-react";
import { cookies } from "next/headers";
import { handleFetchRecommendedPackages } from "@/src/components/RecommendedPackages/RecommendedPackages";
import { addEditableTags } from "@contentstack/utils";
import { EmbeddedItem } from "@contentstack/utils/dist/types/Models/embedded-object";
import { unstable_cache } from "next/cache";

export default async function CompositePage(
  props: PageProps<"/[locale]/[[...slug]]">
) {
  const [{ slug }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const url = slug ? `/${slug.join("/")}` : "/";

  const locale = (await props.params).locale;
  if (locale) {
    stack.setLocale(locale);
  }

  // Get variant alias from search params (middleware adds this)
  const variantAlias = searchParams.variantAlias as string | undefined;

  // Fetch initial data on the server
  let initialData: StudioComponentSpecOptions;
  let style: string;
  try {
    initialData = await studioClient.fetchCompositionData(
      {
        searchQuery: searchParams,
        url,
      },
      {
        variantAlias: variantAlias,
      }
    );
    style = extractStyles([initialData.spec]);
  } catch (error) {
    console.error("Error fetching composition data:", error);
    notFound();
  }

  const shouldShowHeaderAndFooter = !url.includes("/account");

  let packagesData = {};
  if (url.endsWith("/activities") || url.endsWith("/activities/")) {
    //handle lytics recommendations
    const cookieStore = await cookies();
    const userId = cookieStore.get("seerid")?.value || "random";

    // Cache the fetch operation per user and locale
    // Revalidate every 5 minutes to keep recommendations fresh
    const getCachedRecommendedPackages = unstable_cache(
      async (userId: string, locale: string) => {
        return await handleFetchRecommendedPackages({ userId });
      },
      ["recommended-activities", userId, locale || "default"],
      {
        revalidate: 300, // 5 minutes
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

  return (
    <div className="min-h-screen flex flex-col">
      {style && <style id="studio-styles">{style}</style>}
      {shouldShowHeaderAndFooter && (
        <Header searchParams={searchParams} url={url} />
      )}
      <main className="flex-grow">
        <ComposableStudioClient
          initialData={initialData}
          url={url}
          locale={locale}
          variantAlias={variantAlias}
          packagesData={packagesData}
        />
      </main>
      {shouldShowHeaderAndFooter && <Footer searchParams={searchParams} />}
    </div>
  );
}
