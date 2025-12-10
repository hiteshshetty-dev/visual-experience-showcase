import type { PageProps, LocaleParam, SlugParam } from "@/types/pages/types";

type CompositePageParam = LocaleParam & SlugParam;

export default async function CompositePage(props: PageProps<CompositePageParam>) {
  const { locale, slug } = await props.params;
  return (
    <div>
      {/* Initialize Composition Component Here */}
      <h1>{locale}: {slug.join("/")}</h1>
    </div>
  );
}
