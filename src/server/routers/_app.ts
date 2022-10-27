import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { PokemonClient } from 'pokenode-ts';
import { prisma } from '../utils/prisma';

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
  castVote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const voteInDB = await prisma.vote.create({
        data: {
          ...input
        }
      })
      return { success: true, vote: voteInDB };
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;
