import { Card } from "~/components/Card";
import type { Route } from "./+types/home";
import { getPokemonList } from "~/pokemonClient.server";
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
  const pokemonList = await getPokemonList(pokedexId);
  return { pokemonList };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {loaderData.pokemonList.map((pokemonBaseInfo) => (
        <CardLink key={pokemonBaseInfo.id} pokemonBaseInfo={pokemonBaseInfo} />
      ))}
    </div>
  );
}

type CardLinkProps = {
  pokemonBaseInfo: PokemonBaseInfo;
};
const CardLink = ({ pokemonBaseInfo }: CardLinkProps) => {
  const to = `pokemon/${pokemonBaseInfo.id}`;
  const isTransitioning = useViewTransitionState(to);
  return (
    <Link
      to={to}
      viewTransition
      // when the card is clicked, we add the data to the client context so it can be accessed in the clientLoader of the pokemon-page
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
