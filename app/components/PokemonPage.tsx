import { Fragment } from "react";
import { PokemonDynamicInfo } from "~/types";

export type PokemonPageProps = {
  pokemon: PokemonDynamicInfo;
};
export const PokemonPage = ({ pokemon }: PokemonPageProps) => {
  const { name, imageUrl, id, height, weight, stats } = pokemon;
  return (
    <div
      className="text-center bg-slate-200 pb-10 rounded-md"
      style={{ viewTransitionName: name + "-frame" }}
    >
      <div className="flex justify-center">
        <img
          className="aspect-square w-[400px]"
          src={imageUrl}
          alt={name}
          style={{ viewTransitionName: name + "-image" }}
        />
      </div>

      <h1 className="text-3xl my-2 capitalize font-bold">
        <span style={{ viewTransitionName: name + "-title" }}>{name}</span>
      </h1>
      <p className="my-2">
        <span style={{ viewTransitionName: name + "-body" }}># {id}</span>
      </p>
      {stats ? (
        <>
          <p>Height: {height * 10} cm</p>
          <p>Weight: {weight / 10} kg</p>
          <h2 className="my-2 mt-4 text-xl">Stats:</h2>
          <div className=" grid grid-cols-2 gap-2 gap-x-4">
            {stats.map((stat) => (
              <Fragment key={stat.name}>
                <div className="text-right capitalize">{stat.name}</div>
                <div className="text-left">{stat.value}</div>
              </Fragment>
            ))}
          </div>
        </>
      ) : (
        <div className="min-h-72"></div>
      )}
    </div>
  );
};
