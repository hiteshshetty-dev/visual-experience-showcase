import { StudioComponent } from "@contentstack/studio-react";
import { studioClient } from "@/app/composable-studio";


export default async function Home(props: PageProps<'/[locale]'>) {

  const searchQuery = await props.searchParams;
  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchQuery,
    url: "/"
  });

  return (
    <StudioComponent specOptions={studioProps} />
  );
}
