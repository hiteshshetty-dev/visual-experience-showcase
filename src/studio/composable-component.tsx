'use client';


import { StudioComponent, StudioComponentSpecOptions } from "@contentstack/studio-react";
import "../studio/index"
import "../studio/register-components";

export default function ComposableStudioClient({
  initialData,
  url,
  locale
}: {
  initialData: StudioComponentSpecOptions;
  url: string;
  locale: string;
}) {
  const data: { loginUrl?: string } = {};
  if (url.includes('/account/registered')) {
    data.loginUrl = `/${locale}/account/login`;
  }

  return (
    <>
      <StudioComponent specOptions={initialData} data={data} />
    </>
  );
}

