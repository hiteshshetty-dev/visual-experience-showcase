"use client";

import useSWR from "swr";
import type { FetcherProps } from "./types";
import FetcherDataProvider from "@/src/provider/FetcherDataProvider";
import { Fallback, FALLBACK_TYPE } from "./components";
import { getDataFetcher } from "./utils";

export default function Fetcher(props: FetcherProps) {
  const { contentTypeUid, item, loader, error: errorComponent, empty } = props;
  const dataFetcher = getDataFetcher(props);
  const { data, error, isLoading } = useSWR(contentTypeUid, async (key: string) => await dataFetcher(key));
  const dropboxes = [];

  const hasLoader = loader && loader?.props?.nodes?.length > 0;
  const hasErrorComponent = errorComponent && errorComponent?.props?.nodes?.length > 0;
  const hasEmpty = empty && empty?.props?.nodes?.length > 0;
  const hasItem = item && item?.props?.nodes?.length > 0;

  const validationResult = validateProps(props);
  
  switch(validationResult) {
    case FALLBACK_TYPE.NO_TYPE_SELECTED:
      return <Fallback.NoTypeSelected />;
    case FALLBACK_TYPE.NO_CONTENT_TYPE_UID:
      return <Fallback.NoContentTypeUid />;
    case FALLBACK_TYPE.NO_ITEM:
      return <Fallback.NoItemAdded />;
    default:
      break;
  }

  if(!hasItem) {
    dropboxes.push(() => (
      <div className="flex items-center w-full">
        Drop Item Component Here:
        {item}
      </div>
    ));
  }
  if(!hasLoader) {
    dropboxes.push(() => (
      <div className="flex items-center w-full">
        Drop Loader Component Here:
        {loader}
      </div>
    ));
  }
  if(!hasErrorComponent) {
    dropboxes.push(() => (
      <div className="flex items-center w-full">
        Drop Error Component Here:
        {errorComponent}
      </div>
    ));
  }
  if(!hasEmpty) {
    dropboxes.push(() => (
      <div className="flex items-center w-full">
        Drop Empty Component Here:
        {empty}
      </div>
    ));
  }

  if(dropboxes.length > 0) {
    return (
      <div>
        {dropboxes.map((dropbox) => dropbox())}
      </div>
    );
  }

  if(isLoading && hasLoader) {
    return loader;
  }

  if(error && hasErrorComponent) {
    return errorComponent;
  }

  if((!data || data.length === 0) && hasEmpty) {
    return empty;
  }
  
  return (
    <div>
      {
        data?.map((entry: any) => (
          <FetcherDataProvider key={entry.uid} data={entry}>
            {item ? item : <div>No item fallback</div>}
          </FetcherDataProvider>
        ))
      }
    </div>
  )
}

const validateProps = (props: FetcherProps) => {
  const { type, contentTypeUid, item } = props;
  if(!type) {
    return FALLBACK_TYPE.NO_TYPE_SELECTED;
  }
  if(type === "entries") {
    if(!contentTypeUid) {
      return FALLBACK_TYPE.NO_CONTENT_TYPE_UID;
    }
  }
  if(!item) {
    return FALLBACK_TYPE.NO_ITEM;
  }
  return null;
}