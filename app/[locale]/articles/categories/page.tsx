import type { PageProps, LocaleParam } from "@/types/pages/types";

export default async function ArticleCategoriesPage(props: PageProps<LocaleParam>) {
  const { locale } = await props.params;
  return (
    <div>
      <h1>{locale}: Categories</h1>
    </div>
  );
}