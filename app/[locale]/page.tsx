
export default async function Home(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params;
  return (
    <div>
      <h1>{locale}: Hello World</h1>
    </div>
  );
}