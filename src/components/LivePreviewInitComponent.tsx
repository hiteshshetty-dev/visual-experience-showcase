"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import stack from "@/src/livepreview";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";

const DEFAULT_LOCALE = "en-us";

function localeFromParams(
  params: ReturnType<typeof useParams>
): string {
  const loc = params.locale;
  if (typeof loc === "string" && loc.length > 0) {
    return loc;
  }
  if (Array.isArray(loc) && loc[0]) {
    return loc[0];
  }
  return DEFAULT_LOCALE;
}

export default function LivePreviewInitComponent() {
  const params = useParams();
  const locale = localeFromParams(params);

  useEffect(() => {
    ContentstackLivePreview.init({
      stackSdk: stack.config as IStackSdk,
      enable: true,
      ssr: true,
      editButton: {
        enable: true,
      },
      editInVisualBuilderButton: {
        enable: true,
      },
      mode: "builder",
      stackDetails: {
        apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
        branch: "main",
        locale,
      },
    });
  }, [locale]);

  return null;
}