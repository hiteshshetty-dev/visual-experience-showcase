"use client";

import {
  StudioComponent,
  StudioComponentSpecOptions,
} from "@contentstack/studio-react";
import "../studio/index";
import "../studio/register-components";
import { EmbeddedItem } from "@contentstack/utils/dist/types/Models/embedded-object";

export default function ComposableStudioClient({
  initialData,
  url,
  locale,
  variantAlias,
  packagesData,
}: {
  initialData: StudioComponentSpecOptions;
  url: string;
  locale?: string;
  variantAlias?: string;
  packagesData?: {
    recommendedPackages?: EmbeddedItem[];
    otherPackages?: EmbeddedItem[];
    locale?: string;
    backToPackagesUrl?: string;
  };
}) {
  const data: {
    loginUrl?: string;
    variantAlias?: string;
    recommendedPackages?: EmbeddedItem[];
    otherPackages?: EmbeddedItem[];
    locale?: string;
    backToPackagesUrl?: string;
  } = {};
  if (url.includes("/account/registered")) {
    data.loginUrl = `/${locale}/account/login`;
  }
  if (variantAlias) {
    data.variantAlias = variantAlias;
  }
  if (packagesData) {
    if (packagesData.recommendedPackages) {
      data.recommendedPackages = packagesData.recommendedPackages;
    }
    if (packagesData.otherPackages) {
      data.otherPackages = packagesData.otherPackages;
    }
    if (packagesData.locale) {
      data.locale = packagesData.locale;
    }
    if (packagesData.backToPackagesUrl) {
      data.backToPackagesUrl = packagesData.backToPackagesUrl;
    }
  }

  return (
    <>
      <StudioComponent specOptions={initialData} data={data} />
    </>
  );
}
