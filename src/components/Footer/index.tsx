import { studioClient } from "@/src/studio";
import { extractStyles, StudioComponent } from "@contentstack/studio-react";

interface FooterProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Footer({ searchParams }: FooterProps) {

  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    compositionUid: "footer",
  });
  const style = extractStyles([studioProps.spec]);

  return <>
    {style && <style id="studio-styles">{style}</style>}
    <StudioComponent specOptions={studioProps} />
  </>
}
