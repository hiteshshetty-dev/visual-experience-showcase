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
import { prepareActivityRecommendations } from "@/src/utils/prepareActivityRecommendations";
import { LYTICS_USER_UID_COOKIE_NAME } from "@/src/constants/lytics.constants";

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
  console.time("Pre render");
  // Fetch all composition data in parallel (main page, header, footer)
  let initialData: StudioComponentSpecOptions;
  let headerData: StudioComponentSpecOptions;
  let footerData: StudioComponentSpecOptions;
  let style: string;
  try {
    console.time("fetchCompositionData");
    [initialData, headerData, footerData] = await Promise.all([
      studioClient.fetchCompositionData(
        { searchQuery: searchParams, url },
        { variantAlias }
      ),
      studioClient.fetchCompositionData({
        searchQuery: searchParams,
        compositionUid: "header",
      }),
      studioClient.fetchCompositionData({
        searchQuery: searchParams,
        compositionUid: "footer",
      }),
    ]);
    console.timeEnd("fetchCompositionData");
    style = extractStyles([initialData.spec]);
  } catch (error) {
    console.error("Error fetching composition data:", error);
    notFound();
  }

  const shouldShowHeaderAndFooter = !url.includes("/account");

  const cookieStore = await cookies();
  const seerId = cookieStore.get(LYTICS_USER_UID_COOKIE_NAME)?.value || "random";
  const activitiesData = await prepareActivityRecommendations({
    userId: seerId,
    url,
    locale,
  });
  console.timeEnd("Pre render");
  return (
    <div className="min-h-screen flex flex-col">
      {style && <style id="studio-styles">{style}</style>}
      {shouldShowHeaderAndFooter && (
        <Header searchParams={searchParams} url={url} initialData={headerData} />
      )}
      <main className="flex-grow">
        <ComposableStudioClient
          initialData={initialData}
          url={url}
          locale={locale}
          variantAlias={variantAlias}
          activitiesData={activitiesData}
        />
      </main>
      {shouldShowHeaderAndFooter && (
        <Footer searchParams={searchParams} initialData={footerData} />
      )}
    </div>
  );
}
