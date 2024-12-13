import { Card } from "~/components/Card";
import type { Route } from "./+types/home";
import { getPokedexEntries } from "~/pokemonClient.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function headers() {
  return {
    "cache-control": "public, max-age=3600",
  };
}

export async function loader() {
  const pokemonEntries = await getPokedexEntries();
  console.log("pokemon", pokemonEntries);
  return { pokemonEntries };
}

export function Welcome() {}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {loaderData.pokemonEntries.map((entry) => (
        <Card
          key={entry.pokedexNumber}
          title={entry.name}
          imageUrl={entry.imageUrl}
          body={"# " + entry.pokedexNumber}
        />
      ))}
    </main>
  );
}
