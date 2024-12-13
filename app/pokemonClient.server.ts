
export type PokemonEntry = {
  entry_number: number,
  pokemon_species: {
    name: string,
  }
} 
export type Pokedex = {
  pokemon_entries : PokemonEntry[];
}

export const getPokedexEntries = async (): Promise<PokemonBaseInfo[]> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokedex/2");
  const data = await response.json() as Pokedex
  return data.pokemon_entries.map(entry => ({
    name : entry.pokemon_species.name,
    pokedexNumber : entry.entry_number,
    imageUrl : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${entry.entry_number.toString().padStart(3, '0')}.png`,
  }));
}