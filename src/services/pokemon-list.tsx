const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=500";

export const fetchPokemonList = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch Pokemon data");
  return response.json();
};

export const fetchPokemonDetails = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }
  const data = await res.json();
  console.log(data); // Log the fetched data to verify structure
  return data;
};
