import { createContext, useContext } from "react";

export const FetcherContext = createContext<{ data: any }>({
  data: {},
})

export const useFetcherData = () => {
  return useContext(FetcherContext);
}