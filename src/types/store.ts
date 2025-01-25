import { Pokemon } from "./pokemon-card"

export interface PokemonStore {
  pokemonId: string
  setPokemonId: (id: string) => void
  pokemon: Pokemon | null
  setPokemon: (data: Pokemon) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}