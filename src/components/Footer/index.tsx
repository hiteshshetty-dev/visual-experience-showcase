import { studioClient } from "@/src/studio";
import { StudioComponent } from "@contentstack/studio-react";

interface FooterProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Footer({ searchParams }: FooterProps) {

  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    compositionUid: "footer",
  });

  return <StudioComponent specOptions={studioProps} />

}
