import "./index.css";
import ComposableStudioClient from "../../studio/composable-component";
import { extractStyles, StudioComponentSpecOptions } from "@contentstack/studio-react";

interface HeaderProps {
  searchParams: Record<string, string | string[] | undefined>;
  url: string;
  initialData: StudioComponentSpecOptions;
}

export default function Header({ url, initialData }: HeaderProps) {
  const shouldShowHeader = !url.includes("/account");
  if (!shouldShowHeader) {
    return null;
  }
  const style = extractStyles([initialData.spec]);
  return (
    <div className={url === "/" ? "header-wrapper" : ""}>
      {style && <style id="studio-styles-header">{style}</style>}
      <ComposableStudioClient initialData={initialData} url={url} />
    </div>
  );
}
