import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter, AppRouter } from '../../../server/routers/_app';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export type inferQueryResponse<TRouteKey extends keyof AppRouter['_def']['procedures']> = inferProcedureOutput<AppRouter['_def']['procedures'][TRouteKey]>