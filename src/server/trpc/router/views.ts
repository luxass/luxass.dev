import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const viewsRouter = router({
  add: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.views.upsert({
      where: {
        slug: input
      },
      create: {
        slug: input
      },
      update: {
        count: {
          increment: 1
        }
      }
    });
  }),
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.views.findUnique({
      where: {
        slug: input
      }
    });
  })
});