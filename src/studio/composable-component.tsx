'use client';


import { StudioComponent, StudioComponentSpecOptions } from "@contentstack/studio-react";
import "../studio/index"
import "../studio/register-components";

export default function ComposableStudioClient({
  initialData,
  url,
  locale,
  variantAlias
}: {
  initialData: StudioComponentSpecOptions;
  url: string;
  locale?: string;
  variantAlias?: string;
  }) {
  const data: { loginUrl?: string, variantAlias?: string } = {};
  if (url.includes('/account/registered')) {
    data.loginUrl = `/${locale}/account/login`;
  }
  if (variantAlias) {
    data.variantAlias = variantAlias;
  }

  return (
    <>
      <StudioComponent specOptions={initialData} data={data} />
    </>
  );
}

