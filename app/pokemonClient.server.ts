import { Pokedex, PokemonEntry } from "~/types";



export const getPokedexEntries = async (): Promise<PokemonEntry[]> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokedex/2");
  const data = await response.json() as Pokedex
  return data.pokemon_entries;
}