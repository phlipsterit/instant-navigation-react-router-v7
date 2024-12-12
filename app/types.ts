export type PokemonEntry = {
  entry_number: number,
  pokemon_species: {
    name: string,
  }
} 
export type Pokedex = {
  pokemon_entries : PokemonEntry[];
}