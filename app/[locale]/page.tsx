import { StudioComponent } from "@contentstack/studio-react";
import { studioClient } from "@/app/studio";
import { extractStyles } from "@contentstack/studio-react";

export default async function Home(props: PageProps<"/[locale]">) {
  const searchQuery = await props.searchParams;

  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchQuery,
    url: "/",
  });
  const styleSheet = extractStyles([studioProps.spec]);

  return (
    <div>
      <StudioComponent specOptions={studioProps} />
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
    </div>
  );
}
