import { IEpisodeAPI } from "./../models/IEpisode";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "./useDebounce";

export const useEpisode = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);

  const fetcher = async (page: number): Promise<IEpisodeAPI> =>
    axios
      .get(
        `https://rickandmortyapi.com/api/episode/?&page=${page}&name=${search}`
      )
      .then((res) => res.data);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["RickAndMorty", debounced],
    ({ pageParam = 1 }) => fetcher(pageParam),
    {
      getNextPageParam: (lastPage: IEpisodeAPI, pages) => {
        if (lastPage.info.next) {
          return pages.length + 1;
        }
      },
    }
  );

  const episodes = useMemo(
    () =>
      data?.pages?.reduce((prev, page) => {
        return {
          info: page.info,
          results: [...prev.results, ...page.results],
        };
      }),
    [data, debounced]
  );

  return {
    fetchNextPage,
    status,
    hasNextPage,
    episodes,
    search,
    setSearch,
  };
};
