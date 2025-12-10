import type { PageProps, LocaleParam } from "@/types/pages/types";

export default async function ArticlesPage(props: PageProps<LocaleParam>) {
  const { locale } = await props.params;
  return (
    <div>
      <h1>{locale}: Articles</h1>
    </div>
  );
}