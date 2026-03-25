import { extractStyles, StudioComponent, StudioComponentSpecOptions } from "@contentstack/studio-react";

interface FooterProps {
  searchParams: Record<string, string | string[] | undefined>;
  initialData: StudioComponentSpecOptions;
  url: string;
}

export default function Footer({ initialData, url }: FooterProps) {
  const shouldShowFooter = !url.includes("/account");
  if (!shouldShowFooter) {
    return null;
  }
  const style = extractStyles([initialData.spec]);
  return <>
    {style && <style id="studio-styles-footer">{style}</style>}
    <StudioComponent specOptions={initialData} />
  </>
}
