


export default async function ArticlesCategoryPage(props: { params: Promise<{ title: string }> }) {
  const { title } = await props.params;
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}