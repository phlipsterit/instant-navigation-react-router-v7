import { getPokemon } from "~/pokemonClient.server";
import { Route } from "./+types/pokemon";
import { PokemonPage } from "~/components/PokemonPage";
import { clientLoaderContext } from "~/clientLoaderContext";
import { PokemonBaseInfo, PokemonDynamicInfo, PokemonInfo } from "~/types";
import { useEffect, useState } from "react";

const getMetaTitle = (pokemon: PokemonDynamicInfo): string =>
  pokemon.name +
  (pokemon.weight !== undefined ? ` - ${pokemon.weight / 10} kg` : "");

export function meta({ data }: Route.MetaArgs) {
  return [{ title: getMetaTitle(data.pokemon) }];
}

export function headers() {
  return {
    "cache-control": "public, max-age=3600",
  };
}

export async function loader({ params: { id } }: Route.LoaderArgs) {
  return { pokemon: await getPokemon(id) };
}

export async function clientLoader({
  params: { id },
  serverLoader,
}: Route.ClientLoaderArgs) {
  const pokemonBaseInfo = clientLoaderContext.get<PokemonBaseInfo>(id);
  if (pokemonBaseInfo) {
    return {
      pokemon: pokemonBaseInfo,
      // start fetching data from the server loader, but to get instant navigation we dont await it here.
      serverLoaderPromise: serverLoader(),
    };
  }
  // fall back to awaiting the serverLoader if no data was avaialbe in the context
  return await serverLoader();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [pokemon, setPokemon] = useState<PokemonDynamicInfo>(
    loaderData.pokemon
  );

  useEffect(() => {
    if ("serverLoaderPromise" in loaderData) {
      const getFromServer = async () => {
        const serverData = await loaderData.serverLoaderPromise;
        setPokemon(serverData.pokemon);
      };
      getFromServer();
    }
  }, []);

  return (
    <>
      {/* render a title-component to update the title-metatag of the page with the data retrieved after nagivagtion */}
      <title>{getMetaTitle(pokemon)}</title>
      <PokemonPage pokemon={pokemon} />
    </>
  );
}
