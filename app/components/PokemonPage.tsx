import { Fragment } from "react";
import { PokemonInfo } from "~/types";

export type PokemonPageProps = {
  pokemon: PokemonInfo;
};
export const PokemonPage = ({ pokemon }: PokemonPageProps) => {
  const { name, imageUrl, id, height, weight, stats } = pokemon;
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <img className="aspect-square w-[400px]" src={imageUrl} alt={name} />
      </div>

      <h1 className="text-3xl my-2 capitalize font-bold">{name}</h1>
      <p className="my-2"># {id}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <h2 className="my-2 mt-4 text-xl">Stats:</h2>
      <div className=" grid grid-cols-2 gap-2 gap-x-4">
        {stats.map((stat) => (
          <Fragment key={stat.name}>
            <div className="text-right capitalize">{stat.name}</div>
            <div className="text-left">{stat.value}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
