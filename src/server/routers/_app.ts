import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { PokemonClient } from 'pokenode-ts';

export const appRouter = router({
  getPokemonById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return { id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
