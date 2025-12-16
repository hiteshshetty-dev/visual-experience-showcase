'use client';

import { Entry } from "@/src/api/entries/types";
import { useFetcherData } from "@/src/context/FetcherContext";
import titleCase from "@/src/utils/titleCase";
import { addEditableTags } from "@contentstack/utils";
import { useParams } from "next/navigation";
import Image from "next/image";

type ArticleCardProps = {
  [key: string]: unknown;
  exclude: Entry[];
}

export default function ArticleCard(props: ArticleCardProps) {
  const { locale } = useParams();
  const { exclude } = props;
  const { data } = useFetcherData();
  addEditableTags(data, "article", true);
  if(!data ||exclude.some((excludedEntry) => excludedEntry.uid === data?.uid)) {
    return null;
  }
  const taxonomies = getTaxonomies(data?.taxonomies || []);
  return (
    <a href={`/${locale}` + data?.url} className="flex flex-col gap-4 w-[30%] max-w-[440px]">
      {data?.file?.url && <Image src={data.file.url} alt={data?.file?.title || "No image"} width={0} height={0} sizes="100vw" className="w-full h-[300px] object-cover" {...(data.$?.file)}/>}
      <div className="flex flex-col gap-4 p-10">
        <div className="flex">
          {Object.entries(taxonomies).map(([key, value]) => (
            <p className="text-xs font-light" key={key} {...(data.$?.taxonomies)}>
              <span className="pr-2.5 text-gray-500">{key}:</span>
              {
                value.map((v) => (
                  <span className="py-1.5 px-3 mr-2 bg-gray-200" key={v}>{v}</span>
                ))
              }
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold uppercase text-[#404040]" {...(data.$?.title)}>{data?.title || "No title"}</h1>
          <p className="text-sm font-light text-gray-500" {...(data.$?.article_short_overview)}>{data?.article_short_overview}</p>
        </div>
      </div>
    </a>
  )
}

type TaxonomyTerm = {
  taxonomy_uid: string;
  term_uid: string;
}

function getTaxonomies(taxonomies: TaxonomyTerm[]) {
  return taxonomies.reduce((acc, taxonomy) => {
    if(acc[titleCase(taxonomy.taxonomy_uid)]) {
      acc[titleCase(taxonomy.taxonomy_uid)].push(titleCase(taxonomy.term_uid));
    } else {
      acc[titleCase(taxonomy.taxonomy_uid)] = [titleCase(taxonomy.term_uid)];
    }
    return acc;
  }, {} as Record<string, Array<string>>);
}