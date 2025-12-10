import type { PageProps, LocaleParam } from "@/types/pages/types";

type ArticleEntryParam = LocaleParam & {
  title: string;
};
export default async function ArticleEntryPage(props: PageProps<ArticleEntryParam>) {
  const { title, locale } = await props.params;
  return (
    <div>
      <h1>{locale}: {title}</h1>
    </div>
  );
}