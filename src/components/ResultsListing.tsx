import React from "react";
import Image from "next/image";
import { PokemonQueryResult } from "@/pages/results";
import { generatePercentage } from "@/utils/generatePercentage";

interface ResultsListingProps {
  pokemon: PokemonQueryResult[number];
}

const ResultsListing: React.FC<ResultsListingProps> = ({ pokemon }) => {
  return (
    <div className="flex border-b p-2 items-center justify-between">
      <div className="flex items-center">
        <Image
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          width={64}
          height={64}
        />
        <div className="capitalize">{pokemon.name}</div>
      </div>
      <div className="pr-4">{generatePercentage(pokemon) + "%"}</div>
    </div>
  );
};

export default ResultsListing;
