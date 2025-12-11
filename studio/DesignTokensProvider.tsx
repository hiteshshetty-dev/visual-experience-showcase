"use client";

import { useEffect } from "react";
import { registerDesignTokens } from "@contentstack/studio-react";

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
  }, []);

  return null;
}

