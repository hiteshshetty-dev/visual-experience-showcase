"use client";

import { useEffect } from "react";
import {
  registerDesignTokens,
  registerDesignClasses,
} from "@contentstack/studio-react";

const designClasses = [
  {
    name: "whitespace-pre-wrap",
    displayName: "Preserve line breaks (pre-wrap)",
  },
] as const;

export function DesignTokensProvider() {
  useEffect(() => {
    registerDesignTokens(
      {
        colorTokens: {
          "bright-red": "#FF0000",
        },
      },
      { allowedValuesLevel: "arbitrary" }
    );
    registerDesignClasses(designClasses);
  }, []);

  return null;
}

