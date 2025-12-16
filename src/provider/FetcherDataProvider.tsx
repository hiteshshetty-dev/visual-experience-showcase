import { FetcherContext } from "../context/FetcherContext";

export default function FetcherDataProvider(props: { children: React.ReactNode, data: any }) {
  return (
    <FetcherContext.Provider value={{ data: props.data }}>
      {props.children}
    </FetcherContext.Provider>
  )
}