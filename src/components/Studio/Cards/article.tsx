
import { Entry } from "@/src/api/entries/types";
import { useFetcherData } from "@/src/context/FetcherContext";

type ArticleCardProps = {
  [key: string]: any;
  exclude: Entry[];
}

export default function ArticleCard(props: ArticleCardProps) {
  const { exclude } = props;
  const { data } = useFetcherData();
  if(exclude.some((excludedEntry) => excludedEntry.uid === data?.uid)) {
    return null;
  }
  return (
    <div>
      <h1>{data?.title || "No title"}</h1>
    </div>
  )
}