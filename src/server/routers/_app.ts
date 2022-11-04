import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../utils/prisma';

export const appRouter = router({
  getPokemonById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findFirst({ where: { id: input.id } });
      if (!pokemon) throw new Error('Pokemon not found');
      return pokemon;
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
          votedForId: input.votedFor,
          votedAgainstId: input.votedAgainst,
        }
      })
      return { success: true, vote: voteInDB };
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;
