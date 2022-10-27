import { getOptionsForVote } from "@/utils/getRandomPokemon";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsGithub } from "react-icons/bs";

import PokemonListing from "@/components/PokemonListing";

import { trpc } from "../utils/trpc";
import Image from "next/image";

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
        <title>Cutemon</title>
        <meta name="description" content="Cutest Pokemon Vote App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-2xl text-center">
        Which
        <motion.img
          src="/images/pokemon.png"
          alt="pokemon logo"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4 }}
          width={120}
        />{" "}
        is cuter?
      </div>
      <div className="border rounded p-8 flex justify-center items-center w-11/12 max-w-xl mt-4">
        {!firstPokemon.isLoading && !secondPokemon.isLoading ? (
          <>
            <PokemonListing pokemon={firstPokemon.data} vote={voteForCutest} />
            <div className="text-2xl text-center">or</div>
            <PokemonListing pokemon={secondPokemon.data} vote={voteForCutest} />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl text-center">Loading...</div>
            <Image
              src="/images/pokeball.png"
              alt="pokeball"
              width={64}
              height={64}
            />
          </div>
        )}
      </div>
      <motion.div
        className="absolute bottom-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.2, opacity: 1, transition: { duration: 0.2 } }}
      >
        <a
          href="https://github.com/trujillo9616/pokeapp"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub className="text-2xl" />
        </a>
      </motion.div>
    </div>
  );
};

export default Home;
