import { createRouter } from "./context";
import superjson from "superjson";

import { viewsRouter } from "./views";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("views.", viewsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
