import { PokemonCardListProps } from "@/types/pokemon-card";
import { PokemonCard } from "@/components/global/pokemon-card";


export function PokemonCardList({ pokemonList }: PokemonCardListProps) {
  if (pokemonList.length === 0) {
    return <p className="text-center col-span-full">No Pokémon found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.name}
          className="p-4 bg-gray-100 rounded shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-bold capitalize text-center mb-2">
            {pokemon.name}
          </h3>
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
}
