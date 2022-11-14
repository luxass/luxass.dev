import { router } from '../trpc';

import { viewsRouter } from './views';

export const appRouter = router({
  views: viewsRouter
});

export type AppRouter = typeof appRouter;
