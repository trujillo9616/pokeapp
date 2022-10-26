import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="text-2xl text-purple-500">
      <Head>
        <title>Cukemon</title>
        <meta name="description" content="Cutest Pokemon Vote App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello World!
    </div>
  );
};

export default Home;
