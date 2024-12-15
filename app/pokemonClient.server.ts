import type { PokemonBaseInfo, PokemonInfo } from "~/types"

/** utility function to get data from the pokemon api */

/** Types matching the pokemon api */
type PokemonEntry = {
  pokemon_species: {
    name: string,
    url: string,
  }
} 
type Pokedex = {
  pokemon_entries : PokemonEntry[];
}

type Pokemon = {
  name : string,
  id : string,
  imageUrl : string,
  height: number,
  weight: number,
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[]
};

export const getPokemonList = async (pokedexId: string): Promise<PokemonBaseInfo[]> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokedex/" + pokedexId);
  const data = await response.json() as Pokedex
  return data.pokemon_entries.map(entry => {
    const match = entry.pokemon_species.url.match(/\/pokemon-species\/(\d+)\//);
    if(!match) {
      console.error(`Invalid URL for ${entry.pokemon_species.name}: ${entry.pokemon_species.url}`);
    }
    const id = match ? match[1] : "";
      
    return {
      name : entry.pokemon_species.name,
      id: id,
      imageUrl : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id.padStart(3, '0')}.png`,
  }});
}

export const getPokemon = async (id: string): Promise<PokemonInfo> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json() as Pokemon
  return {
    id,
    name: pokemon.name,
    imageUrl : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id.padStart(3, '0')}.png`,
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat}))

  }
}
