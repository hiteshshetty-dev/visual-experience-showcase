import Footer from "@/src/components/Footer";
import { studioClient } from "@/src/studio";
import ComposableStudioClient from "@/src/components/ComposableStudioClient";
import Header from "@/src/components/Header";

export default async function CompositePage(props: PageProps<'/[locale]/[[...slug]]'>) {

  const [{slug}, searchParams] = await Promise.all([props.params, props.searchParams]);
  const url = slug ? `/${slug.join("/")}` : '/';

  // Fetch initial data on the server
  const initialData = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    url
  });


  return (
    <div>
      <Header searchParams={searchParams} />
      <ComposableStudioClient 
        initialData={initialData}
        url={url}
      />
      <Footer searchParams={searchParams} />
    </div>
  );
}
