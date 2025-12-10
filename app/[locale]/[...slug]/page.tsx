import { StudioComponent } from "@contentstack/studio-react";
import { studioClient } from "@/app/studio";
import { extractStyles } from "@contentstack/studio-react";

export default async function CompositePage(props: PageProps<'/[locale]/[...slug]'>) {

  const { slug }= await props.params;

  const url = `/${slug.join("/")}`;

  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: await props.searchParams,
    url
  });
  const styleSheet = extractStyles([studioProps.spec]);


  return (
    <div>
      <StudioComponent specOptions={studioProps} />
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
    </div>
  );
}
