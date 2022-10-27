import React from "react";
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";
import Image from "next/image";

interface PokemonListingProps {
  pokemon: inferQueryResponse<"getPokemonById"> | undefined;
  vote: (selected: number | undefined) => void;
}

const BUTTON = {
  string: "Cuter",
  style:
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2",
};

const PokemonListing: React.FC<PokemonListingProps> = ({ pokemon, vote }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src={pokemon?.sprites.front_default!}
        alt={pokemon?.name!}
        width={64}
        height={64}
        priority
        className="w-full h-full"
      />
      <div className="text-2xl text-center capitalize mt-[-0.5rem]">
        {pokemon?.name}
      </div>
      <button className={BUTTON.style} onClick={() => vote(pokemon?.id)}>
        {BUTTON.string}
      </button>
    </div>
  );
};

export default PokemonListing;
