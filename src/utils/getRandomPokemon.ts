const MAX_POKEDEX_NUMBER = 898;
const MIN_POKEDEX_NUMBER = 1;

export const getRandomPokemon: (notThisOne?: number) => number = (notThisOne) => {
  const pokedexNum = Math.floor(Math.random() * (MAX_POKEDEX_NUMBER - MIN_POKEDEX_NUMBER + 1)) + MIN_POKEDEX_NUMBER;

  if (pokedexNum !== notThisOne) return pokedexNum;
  return getRandomPokemon(notThisOne);
}

export const getOptionsForVote = () => {
  const firstPokemon = getRandomPokemon();
  const secondPokemon = getRandomPokemon(firstPokemon);

  return [firstPokemon, secondPokemon];
}
