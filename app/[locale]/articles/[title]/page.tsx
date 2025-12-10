import type { PageProps, LocaleParam } from "@/types/pages/types";

type ArticleParam = LocaleParam & {
  title: string;
};

export default async function ArticlesTitlePage(props: PageProps<ArticleParam>) {
  const { title, locale } = await props.params;
  return (
    <div>
      <h1>{locale}: {title}</h1>
    </div>
  );
}