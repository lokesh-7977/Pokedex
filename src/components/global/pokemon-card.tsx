import Image from "next/image";
import Link from "next/link";
import { PokemonCardProps } from "@/types/pokemon-card";

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonId = pokemon.url.split("/")[6];
  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <>
      <Link href={`/pokemon/${pokemon.name}`}>
        <Image
          src={pokemonImage}
          alt={pokemon.name}
          width={150}
          height={150}
          priority
          className="mx-auto"
        />
      </Link>
    </>
  );
}
