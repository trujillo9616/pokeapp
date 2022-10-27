import { getOptionsForVote } from "@/utils/getRandomPokemon";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import PokemonListing from "@/components/PokemonListing";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const [first, second] = getOptionsForVote();
    setFirst(first);
    setSecond(second);
  }, []);

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second });
  const voteMutation = trpc.castVote.useMutation();

  const voteForCutest = (selected: number | undefined) => {
    if (selected === undefined) return;

    const votes =
      selected === first
        ? {
            votedFor: first,
            votedAgainst: second,
          }
        : {
            votedFor: second,
            votedAgainst: first,
          };

    voteMutation.mutate(votes);
    const [firstId, secondId] = getOptionsForVote();
    setFirst(firstId);
    setSecond(secondId);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Head>
        <title>Cukemon</title>
        <meta name="description" content="Cutest Pokemon Vote App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-2xl text-center">Which Pokémon is cuter?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        {!firstPokemon.isLoading && !secondPokemon.isLoading ? (
          <>
            <PokemonListing pokemon={firstPokemon.data} vote={voteForCutest} />
            <div className="p-8">Vs</div>
            <PokemonListing pokemon={secondPokemon.data} vote={voteForCutest} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
