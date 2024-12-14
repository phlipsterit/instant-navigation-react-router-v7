import { getPokemon } from "~/pokemonClient.server";
import { Route } from "./+types/pokemon";
import { PokemonPage } from "~/components/PokemonPage";
import { clientLoaderContext } from "~/clientLoaderContext";
import { PokemonBaseInfo, PokemonDynamicInfo, PokemonInfo } from "~/types";
import { useEffect, useState } from "react";

export function meta({ data }: Route.MetaArgs) {
  const pokemon =
    "pokemonInfo" in data ? data.pokemonInfo : data.pokemonBaseInfo;
  return [{ title: pokemon.name }];
}

export function headers() {
  return {
    "cache-control": "public, max-age=3600",
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  const pokemonId = params["id"];
  const pokemon = await getPokemon(pokemonId);
  return { pokemonInfo: pokemon };
}

export async function clientLoader({
  params,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const { id } = params;
  const pokemonBaseInfo = clientLoaderContext.get<PokemonBaseInfo>(id);
  if (pokemonBaseInfo) {
    return {
      pokemonBaseInfo,
      serverLoaderPromise: serverLoader(),
    };
  }
  const serverData = await serverLoader();
  return serverData;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [pokemon, setPokemon] = useState<PokemonDynamicInfo>(
    "pokemonInfo" in loaderData
      ? loaderData.pokemonInfo
      : loaderData.pokemonBaseInfo
  );

  useEffect(() => {
    if ("pokemonInfo" in loaderData) {
      return;
    }
    const getFromServer = async () => {
      const serverData = await loaderData.serverLoaderPromise;
      setPokemon(serverData.pokemonInfo);
    };
    getFromServer();
  }, []);
  return (
    <>
      <title>
        {pokemon.name +
          (pokemon.weight !== undefined ? " - " + pokemon.weight + " kg" : "")}
      </title>
      <PokemonPage pokemon={pokemon} />
    </>
  );
}
