
export type PokemonBaseInfo = {
  id: string;
  name: string;
  imageUrl: string;
}

export type PokemonInfo = PokemonBaseInfo & {
  height: number,
  weight: number,
  stats: {name: string, value: number}[];
}