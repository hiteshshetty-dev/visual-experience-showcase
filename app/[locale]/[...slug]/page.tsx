

export default async function CompositePage(props: PageProps<'/[locale]/[...slug]'>) {
  const { locale, slug } = await props.params;
  return (
    <div>
      {/* Initialize Composition Component Here */}
      <h1>{locale}: {slug.join("/")}</h1>
    </div>
  );
}
