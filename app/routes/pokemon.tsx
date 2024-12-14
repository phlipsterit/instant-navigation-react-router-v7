import { getPokemon } from "~/pokemonClient.server";
import { Route } from "./+types/pokemon";
import { PokemonPage } from "~/components/PokemonPage";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data.pokemon.name },
    { name: "description", content: "App for showing all pokemons" },
  ];
}

export function headers() {
  return {
    "cache-control": "public, max-age=3600",
  };
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const pokemonId = params["id"];
  const pokemon = await getPokemon(pokemonId);
  return { pokemon };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { pokemon } = loaderData;
  return <PokemonPage pokemon={pokemon} />;
}
