import { getOptionsForVote } from "@/utils/getRandomPokemon";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>Loading...</div>;
  }

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
        <div className="w-64 h-64 flex flex-col justify-center items-center">
          <Image
            src={firstPokemon.data?.sprites.front_default!}
            alt={firstPokemon.data?.name!}
            width={64}
            height={64}
            placeholder="blur"
            blurDataURL={firstPokemon.data?.sprites.front_default!}
            priority
            className="w-full h-full"
          />
          <div className="text-2xl text-center capitalize mt-[-0.5rem]">
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col justify-center items-center">
          <Image
            src={secondPokemon.data?.sprites.front_default!}
            alt={secondPokemon.data?.name!}
            width={64}
            height={64}
            placeholder="blur"
            blurDataURL={secondPokemon.data?.sprites.front_default!}
            priority
            className="w-full h-full"
          />
          <div className="text-2xl text-center capitalize mt-[-0.5rem]">
            {secondPokemon.data?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
