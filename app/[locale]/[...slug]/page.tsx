import { StudioComponent } from "@contentstack/studio-react";
import { studioClient } from "@/app/studio";
import { extractStyles } from "@contentstack/studio-react";
import Footer from "@/components/Footer";

export default async function CompositePage(props: PageProps<'/[locale]/[...slug]'>) {

  const [{slug}, searchParams] = await Promise.all([props.params, props.searchParams]);
  const url = `/${slug.join("/")}`;

  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    url
  });
  const styleSheet = extractStyles([studioProps.spec]);

  return (
    <div>
      <StudioComponent specOptions={studioProps} />
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <Footer searchParams={searchParams} />
    </div>
  );
}
