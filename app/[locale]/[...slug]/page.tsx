import { StudioComponent } from "@contentstack/studio-react";
import { studioClient } from "@/app/composable-studio";


export default async function CompositePage(props: PageProps<'/[locale]/[...slug]'>) {
  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: await props.searchParams,
    url: "/"
  });

  return (
    <StudioComponent specOptions={studioProps} />
  );
}
