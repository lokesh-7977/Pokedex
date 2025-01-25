import { create } from "zustand";
import { PokemonStore } from "@/types/store";

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemonId: "",
  setPokemonId: (id) => set({ pokemonId: id }),
  pokemon: null,
  setPokemon: (data) => set({ pokemon: data }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));


