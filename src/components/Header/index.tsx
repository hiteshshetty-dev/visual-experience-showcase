import { studioClient } from "@/src/studio";
import { StudioComponent } from "@contentstack/studio-react";
import './index.css';
interface HeaderProps {
  searchParams: Record<string, string | string[] | undefined>;
  url: string;
}

export default async function Header({ searchParams, url }: HeaderProps) {
  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    compositionUid: 'header',
  });

  return <>
  <div className={url === '/' ? 'header-wrapper' : ''}>
  <StudioComponent specOptions={studioProps} />
  </div>
  </>

}
