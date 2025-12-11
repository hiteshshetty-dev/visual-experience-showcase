"use client";
import { useEffect } from "react";
import stack from "@/src/livepreview";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";

export default function LivePreviewInitComponent() {
    useEffect(() => {
        ContentstackLivePreview.init({
            stackSdk: stack.config as IStackSdk,
            enable: true,
            ssr: false,
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
            }
          })
    }, []);
    return null;
}