"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/services/pokemon-list";
import { useState, useCallback, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchInput } from "@/components/global/search-input";
import { PokemonCardList } from "@/components/global/pokemon-list";
import { PokemonLoader } from "@/constants/loader";
import { Pokemon } from "@/types/pokemon-card";

export default function Home() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonList,
    staleTime: 600000,
  });

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const filteredPokemon = useMemo(() => {
    if (!debouncedSearch || !data) return data?.results || [];
    return data.results.filter((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, data]);

  if (isLoading) {
    return <PokemonLoader />;
  }

  if (isError) {
    return <p className="text-center mt-8">Failed to load data</p>;
  }

  return (
    <main className="container mx-auto px-4">
      <SearchInput value={search} onChange={handleSearchChange} />
      <PokemonCardList pokemonList={filteredPokemon} />
    </main>
  );
}
