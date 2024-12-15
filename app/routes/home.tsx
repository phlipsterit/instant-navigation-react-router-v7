import { Card } from "~/components/Card";
import type { Route } from "./+types/home";
import { getPokedexEntries } from "~/pokemonClient.server";
import { Link, useViewTransitionState } from "react-router";
import { clientLoaderContext } from "~/clientLoaderContext";
import { PokemonBaseInfo } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokedex app" },
    { name: "description", content: "App for showing all pokemons" },
  ];
}

export function headers() {
  return {
    "cache-control": "public, max-age=3600",
  };
}

export async function loader({ request }: Route.LoaderArgs) {
  const pokedexId = new URL(request.url).searchParams.get("pokedexId") || "2";
  const pokemonEntries = await getPokedexEntries(pokedexId);
  return { pokemonEntries };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {loaderData.pokemonEntries.map((pokemonBaseInfo) => (
        <CardLink key={pokemonBaseInfo.id} pokemonBaseInfo={pokemonBaseInfo} />
      ))}
    </div>
  );
}

const CardLink = ({
  pokemonBaseInfo,
}: {
  pokemonBaseInfo: PokemonBaseInfo;
}) => {
  const to = `pokemon/${pokemonBaseInfo.id}`;
  const isTransitioning = useViewTransitionState(to);
  return (
    <Link
      to={to}
      viewTransition
      onClick={() => {
        clientLoaderContext.set(pokemonBaseInfo.id, pokemonBaseInfo);
      }}
    >
      <Card
        title={pokemonBaseInfo.name}
        enableViewTransition={isTransitioning}
        imageUrl={pokemonBaseInfo.imageUrl}
        body={"# " + pokemonBaseInfo.id}
      />
    </Link>
  );
};
