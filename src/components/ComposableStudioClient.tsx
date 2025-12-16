import { StudioComponent, StudioComponentSpecOptions } from "@contentstack/studio-react";
import "../studio/index"
import { usePathname } from "next/navigation";


export default function ComposableStudioClient({
  initialData,
}: {
  initialData: StudioComponentSpecOptions;
  url: string;
}) {
    const pathname = usePathname();


    if (pathname.includes('/account/registered')) {
    const locale = pathname.split('/').filter(Boolean)[0];
    const loginPath = `/${locale}/account/login`;
    const fullLoginUrl = new URL(loginPath, window.location.origin).href;
    return (
      <>
        <StudioComponent data={{ loginUrl: fullLoginUrl }} specOptions={initialData} />
      </>
    );
  }

  return (
    <>
      <StudioComponent specOptions={initialData} />
    </>
  );
}

