import type { NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.hello.useQuery({ text: "Adrian" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <div>{data.greeting}</div>;
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
        <div className="w-16 h-16 bg-red-400" />
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-pink-400" />
      </div>
    </div>
  );
};

export default Home;
