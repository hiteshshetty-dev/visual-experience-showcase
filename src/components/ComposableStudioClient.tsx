"use client";

import { StudioComponent, StudioComponentSpecOptions, useCompositionData } from "@contentstack/studio-react";
import { useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import "../studio/index"
import { usePathname } from "next/navigation";


export default function ComposableStudioClient({
  initialData,
  url,
}: {
  initialData: StudioComponentSpecOptions;
  url: string;
}) {
  // Use the hook to get refetch function
  const { specOptions, refetchSpec } = useCompositionData({
    url,
  });
  const pathname = usePathname();

  // Subscribe to live preview changes
  useEffect(() => {
    if (refetchSpec) {
      ContentstackLivePreview.onEntryChange(refetchSpec);
    }

    // Cleanup function
    return () => {
      // Unsubscribe if there's a cleanup method
      if (ContentstackLivePreview.unsubscribeOnEntryChange) {
        ContentstackLivePreview.unsubscribeOnEntryChange(refetchSpec);
      }
    };
  }, [refetchSpec]);

  // Use data from hook (will be initialData on first render, then updated data)
  const studioProps = specOptions || initialData;

  if (pathname.includes('/account/registered')) {
    const locale = pathname.split('/').filter(Boolean)[0];
    const loginPath = `/${locale}/account/login`;
    const fullLoginUrl = new URL(loginPath, window.location.origin).href;
    return (
      <>
        <StudioComponent data={{ loginUrl: fullLoginUrl }} specOptions={studioProps} />
      </>
    );
  }

  return (
    <>
      <StudioComponent specOptions={studioProps} />
    </>
  );
}

