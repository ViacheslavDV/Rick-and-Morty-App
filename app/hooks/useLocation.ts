import { ILocationAPI } from "./../models/ILocation";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "./useDebounce";

export const useLocation = () => {
  const [locationType, setLocationType] = useState("");
  const [dimension, setDimension] = useState("");
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);

  const fetcher = async (page: number): Promise<ILocationAPI> =>
    axios
      .get(
        `https://rickandmortyapi.com/api/location/?&page=${page}&name=${search}&type=${locationType}&dimension=${dimension}`
      )
      .then((res) => res.data);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["RickAndMorty", debounced, locationType, dimension],
    ({ pageParam = 1 }) => fetcher(pageParam),
    {
      getNextPageParam: (lastPage: ILocationAPI, pages) => {
        if (lastPage.info.next) {
          return pages.length + 1;
        }
      },
    }
  );

  const locations = useMemo(
    () =>
      data?.pages?.reduce((prev, page) => {
        return {
          info: page.info,
          results: [...prev.results, ...page.results],
        };
      }),
    [data, debounced, locationType, dimension]
  );

  return {
    fetchNextPage,
    status,
    hasNextPage,
    locations,
    search,
    setSearch,
    locationType,
    setLocationType,
    dimension,
    setDimension,
  };
};
