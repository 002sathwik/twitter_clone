/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from './../trpc';
import { todoInput, toggleeInput } from '~/server/schema/zodSchema';


export const todoRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {

        const todos = await ctx.db.todo.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });

        return todos.map(({ id, text, done }) =>
            ({ id, text, done })
        );
        return [
            {
                id: 'fake',
                text: "fake text",
                done: false,
            },
            {
                id: 'fake1',
                text: "fake1 text",
                done: true,
            }
        ]
    }),

    create: protectedProcedure.input(todoInput).mutation(async ({ ctx, input }) => {
        const newTodo = await ctx.db.todo.create({
            data: {
                text: input,
                done: false, // Default value for a new to-do
                user: {
                    connect: {
                        id: ctx.session.user.id, // Assuming session contains user data
                    },
                },
            },
        });

        return newTodo;
    }),
    delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        const deletedTodo = await ctx.db.todo.delete({
            where: {
                id: input,
            },
        });

        return deletedTodo;
    }),
    toggle: protectedProcedure.input(toggleeInput).mutation(async ({ ctx, input }) => {
        const toggleTodo = await ctx.db.todo.update({
            where: {
                id: input.id,
                userId: ctx.session.user.id, // Ensure the user owns the to-do item
            },
            data: {
                done: input.done,
            },
        });

        return toggleTodo;
    }),

})

