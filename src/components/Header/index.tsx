import { studioClient } from "@/src/studio";
import "./index.css";
import ComposableStudioClient from "../../studio/composable-component";
interface HeaderProps {
  searchParams: Record<string, string | string[] | undefined>;
  url: string;
}

export default async function Header({ searchParams, url }: HeaderProps) {
  const studioProps = await studioClient.fetchCompositionData({
    searchQuery: searchParams,
    compositionUid: "header",
  });

  return (
    <div className={url === "/" ? "header-wrapper" : ""}>
      <ComposableStudioClient initialData={studioProps} url={url} />
    </div>
  );
}
