import { studioClient } from "@/src/studio";
import "./index.css";
import ComposableStudioClient from "../../studio/composable-component";
import { extractStyles } from "@contentstack/studio-react";
interface HeaderProps {
  searchParams: Record<string, string | string[] | undefined>;
  url: string;
}

export default async function Header({ searchParams, url }: HeaderProps) {
  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    compositionUid: "header",
  });
  const style = extractStyles([studioProps.spec]);
  return (
    <div className={url === "/" ? "header-wrapper" : ""}>
      {style && <style id="studio-styles">{style}</style>}
      <ComposableStudioClient initialData={studioProps} url={url} />
    </div>
  );
}
