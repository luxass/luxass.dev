import { createRouter } from './context';
import { z } from 'zod';

export const viewsRouter = createRouter()
  .query('get', {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.views.findFirst({
        where: {
          slug: input
        }
      });
    }
  })
  .query('getViewsBySlugs', {
    input: z.array(z.string()),
    async resolve({ ctx, input }) {
      return await ctx.prisma.views.findMany({
        where: {
          // somehow get all views by slugs.
        }
      });
    }
  });
