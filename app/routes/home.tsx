import { Card } from "~/components/Card";
import type { Route } from "./+types/home";
import { getPokedexEntries } from "~/pokemonClient.server";
import { Link } from "react-router";

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
      {loaderData.pokemonEntries.map((entry) => (
        <Link key={entry.id} to={`pokemon/${entry.id}`}>
          <Card
            title={entry.name}
            imageUrl={entry.imageUrl}
            body={"# " + entry.id}
          />
        </Link>
      ))}
    </div>
  );
}
