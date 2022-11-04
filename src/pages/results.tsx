import React from "react";
import { prisma } from "@/server/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-bs";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const getPokemonResults = async () => {
  return await prisma.pokemon.findMany({
    orderBy: {
      votesFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          votesFor: true,
          votesAgainst: true,
        },
      },
    },
  });
};

type PokemonQueryResult = AsyncReturnType<typeof getPokemonResults>;

const generatePercentage = (pokemon: PokemonQueryResult[number]) => {
  const { votesFor, votesAgainst } = pokemon._count;
  if (votesFor + votesAgainst === 0) return 0;
  return Math.round((votesFor / (votesFor + votesAgainst)) * 100);
};

const PokemonListing = (pokemon: PokemonQueryResult[number]) => {
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

const ResultsPage: React.FC<{
  pokemon: PokemonQueryResult;
}> = (props) => {
  console.log(props);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center py-6">
        <h2 className="text-3xl">Results</h2>
        <motion.div
          className="px-4"
          initial={{ opacity: 0.3, scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.2, opacity: 1, transition: { duration: 0.2 } }}
        >
          <Link href="/" className="">
            Go Back
          </Link>
        </motion.div>
      </div>
      <div className="flex flex-col w-full max-w-2xl border">
        {props.pokemon.map((pokemon) => {
          return <PokemonListing key={pokemon.id} {...pokemon} />;
        })}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const pokemonResults = await getPokemonResults();
  return {
    props: {
      pokemon: pokemonResults,
    },
    revalidate: 60,
  };
};
