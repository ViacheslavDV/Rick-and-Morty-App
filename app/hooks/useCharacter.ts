import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ICharacterAPI } from "../models/ICharacter";
import axios from "axios";
import { useDebounce } from "./useDebounce";

export const useCharacter = () => {
  const [search, setSearch] = useState("");
  const [lifeStatus, setLifeStatus] = useState("");
  const [gender, setGender] = useState("");
  const debounced = useDebounce(search);

  const fetcher = async (page: number): Promise<ICharacterAPI> =>
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?&page=${page}&name=${search}&status=${lifeStatus}&gender=${gender}`
      )
      .then((res) => res.data);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["RickAndMorty", debounced, lifeStatus, gender],
    ({ pageParam = 1 }) => fetcher(pageParam),
    {
      getNextPageParam: (lastPage: ICharacterAPI, pages) => {
        if (lastPage.info.next) {
          return pages.length + 1;
        }
      },
    }
  );

  const characters = useMemo(
    () =>
      data?.pages?.reduce((prev, page) => {
        return {
          info: page.info,
          results: [...prev.results, ...page.results],
        };
      }),
    [data, debounced, lifeStatus, gender]
  );

  return {
    fetchNextPage,
    status,
    hasNextPage,
    characters,
    search,
    setSearch,
    lifeStatus,
    setLifeStatus,
    gender,
    setGender,
  };
};
