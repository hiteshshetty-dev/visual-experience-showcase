"use client";

import { useEffect } from "react";
import { registerComponents } from "@contentstack/studio-react";
import { components } from "./register-components";

export function RegisterComponentProvider() {
  useEffect(() => {
    registerComponents(components);
  }, []);

  return null;
}

