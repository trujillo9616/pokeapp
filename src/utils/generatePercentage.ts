import { PokemonQueryResult } from "@/pages/results";

export const generatePercentage = (pokemon: PokemonQueryResult[number]) => {
  const { votesFor, votesAgainst } = pokemon._count;
  if (votesFor + votesAgainst === 0) return 0;
  return Math.round((votesFor / (votesFor + votesAgainst)) * 100);
};
