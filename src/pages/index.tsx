import { getOptionsForVote } from "@/utils/getRandomPokemon";
import type { NextPage } from "next";
import Head from "next/head";
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
        <div className="w-16 h-16 bg-red-400">{first}</div>
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-pink-400">{second}</div>
      </div>
    </div>
  );
};

export default Home;
