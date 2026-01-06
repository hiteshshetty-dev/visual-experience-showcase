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
  activitiesData,
}: {
  initialData: StudioComponentSpecOptions;
  url: string;
  locale?: string;
  variantAlias?: string;
  activitiesData?: {
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
  if (activitiesData) {
    if (activitiesData.recommendedPackages) {
      data.recommendedPackages = activitiesData.recommendedPackages;
    }
    if (activitiesData.otherPackages) {
      data.otherPackages = activitiesData.otherPackages;
    }
    if (activitiesData.locale) {
      data.locale = activitiesData.locale;
    }
    if (activitiesData.backToPackagesUrl) {
      data.backToPackagesUrl = activitiesData.backToPackagesUrl;
    }
  }

  return (
    <>
      <StudioComponent specOptions={initialData} data={data} />
    </>
  );
}
