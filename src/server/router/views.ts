import { createRouter } from './context';
import { z } from 'zod';

export const viewsRouter = createRouter()
  .query('add', {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.views.upsert({
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
    }
  })
  .query('get', {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.views.findUnique({
        where: {
          slug: input
        }
      });
    }
  });
