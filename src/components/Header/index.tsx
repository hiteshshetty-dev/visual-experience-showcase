import { studioClient } from "@/src/studio";
import { StudioComponent } from "@contentstack/studio-react";

interface HeaderProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Header({ searchParams }: HeaderProps) {

  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    compositionUid: "header",
  });

  return <StudioComponent specOptions={studioProps} />

}
