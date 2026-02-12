import { extractStyles, StudioComponent, StudioComponentSpecOptions } from "@contentstack/studio-react";

interface FooterProps {
  searchParams: Record<string, string | string[] | undefined>;
  initialData: StudioComponentSpecOptions;
}

export default function Footer({ initialData }: FooterProps) {
  const style = extractStyles([initialData.spec]);

  return <>
    {style && <style id="studio-styles">{style}</style>}
    <StudioComponent specOptions={initialData} />
  </>
}
