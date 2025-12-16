import Footer from '@/src/components/Footer';
import stack, { studioClient } from '@/src/studio';
import ComposableStudioClient from '@/src/studio/composable-component';
import Header from '@/src/components/Header';
import { notFound } from 'next/navigation';

export default async function CompositePage(
  props: PageProps<'/[locale]/[[...slug]]'>,
) {
  const [{ slug }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const url = slug ? `/${slug.join('/')}` : '/';

  const locale = (await props.params).locale;
  if (locale) {
    stack.setLocale(locale);
  }

  // Get variant alias from search params (middleware adds this)
  const variantAlias = searchParams.variantAlias as string;
  console.log("[PAGE]", variantAlias, url);

  // Fetch initial data on the server
  let initialData;
  try {
    initialData = await studioClient.fetchCompositionData(
      {
        searchQuery: searchParams,
        url,
      },
      {
        variantAlias: variantAlias || "default",
      }
    );
  } catch (error) {
    console.error('Error fetching composition data:', error);
    notFound();
  }

  const shouldShowHeaderAndFooter = !url.includes("/account");


  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowHeaderAndFooter && <Header searchParams={searchParams} url={url} />}
      <main className="flex-grow">
        <ComposableStudioClient initialData={initialData} url={url} locale={locale} />
      </main>
      {shouldShowHeaderAndFooter && <Footer searchParams={searchParams} />}
    </div>
  );
}
