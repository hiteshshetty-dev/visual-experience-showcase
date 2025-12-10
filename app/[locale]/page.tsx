import type { PageProps, LocaleParam } from "@/types/pages/types";

export default async function Home(props: PageProps<LocaleParam>) {
  const { locale } = await props.params;
  return (
    <div>
      <h1>{locale}: Hello World</h1>
    </div>
  );
}