import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from './../trpc';


export const todoRouter = createTRPCRouter({
    all: protectedProcedure.query(({ctx}) => {
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
    })
})

