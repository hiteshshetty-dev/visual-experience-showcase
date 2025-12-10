import type React from "react";

export interface LocaleParam {
  locale: string;
}

export interface SlugParam {
  slug: string[];
}

export interface PageProps<T> extends React.PropsWithChildren {
  params: Promise<T>;
}