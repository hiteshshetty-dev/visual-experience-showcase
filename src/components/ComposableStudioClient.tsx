"use client";

import { StudioComponent, StudioComponentSpecOptions, useCompositionData } from "@contentstack/studio-react";
import { useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import "../studio/index"


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

  return (
    <>
      <StudioComponent specOptions={studioProps} />
    </>
  );
}

