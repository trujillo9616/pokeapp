import React from "react";
import { prisma } from "@/server/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-bs";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import ResultsListing from "@/components/ResultsListing";
import { generatePercentage } from "@/utils/generatePercentage";

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

export type PokemonQueryResult = AsyncReturnType<typeof getPokemonResults>;

const ResultsPage: React.FC<{
  pokemon: PokemonQueryResult;
}> = (props) => {
  console.log(props);
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center">
      <Head>
        <title>Cutemon - Results</title>
        <meta name="description" content="Cutest Pokemon Vote App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center py-6">
          <h2 className="text-3xl">Results</h2>
          <motion.div
            className="px-4"
            initial={{ opacity: 0.3, scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{
              scale: 1.2,
              opacity: 1,
              transition: { duration: 0.2 },
            }}
          >
            <Link href="/" className="">
              Go Back
            </Link>
          </motion.div>
        </div>
        <div className="flex flex-col w-full max-w-2xl border">
          {props.pokemon
            .sort((a, b) => {
              if (generatePercentage(a) === generatePercentage(b))
                return b._count.votesFor - a._count.votesFor;
              return generatePercentage(b) - generatePercentage(a);
            })
            .map((pokemon) => {
              return <ResultsListing key={pokemon.id} pokemon={pokemon} />;
            })}
        </div>
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
    revalidate: 10,
  };
};
