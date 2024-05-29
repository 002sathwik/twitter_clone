import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { todoInput } from "../../../types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    const dummyData = [
        {
          id: 'fake',
          text: 'fake text',
          done: false,
        },
        {
          id: 'fake1',
          text: 'fake1 text',
          done: true,
        },
      ];
  
      // Concatenate dummy data with actual todos
      const allTodos = [...todos.map(({ id, text, done }) => ({ id, text, done })), ...dummyData];
  
      return allTodos;
  }),
  create: protectedProcedure.input(todoInput).mutation(({ ctx, input }) => {
    // throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return ctx.db.todo.create({
      data: {
        text: input,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.todo.delete({
      where: {
        id: input,
      },
    });
  }),
  toggle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.db.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),
});