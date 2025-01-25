export interface Pokemon {
  stats: { [key: string]: number };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string; back_default: string };
  abilities: { ability: { name: string } }[];
  url: string;
  name: string;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
}

export interface PokemonCardListProps {
  pokemonList: Pokemon[];
}