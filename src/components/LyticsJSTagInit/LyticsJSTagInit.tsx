"use client";

import { getLyticsInitSrcUrl } from "@/src/utils/getLyticsInitSrcUrl";
import { useEffect } from "react";

export function LyticsJSTagInit() {
  useEffect(() => {
    if (!window?.jstag) return;
    if (window.jstag.isLoaded) return;
    const projectId = process.env.NEXT_PUBLIC_LYTICS_PROJECT_ID;
    if (!projectId) {
      console.warn("NEXT_PUBLIC_LYTICS_PROJECT_ID is not set");
      return;
    }
    window.jstag.init({
      src: getLyticsInitSrcUrl({
        projectId,
      }),
    });
  }, []);
  return null;
}
