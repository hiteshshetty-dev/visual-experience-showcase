import type { PageProps, LocaleParam } from "@/types/pages/types";

type ArticleCategoryParam = LocaleParam & {
  title: string;
};

export default async function ArticleCategoryPage(props: PageProps<ArticleCategoryParam>) {
  const { title, locale } = await props.params;
  return (
    <div>
      <h1>{locale}: {title}</h1>
    </div>
  );
}