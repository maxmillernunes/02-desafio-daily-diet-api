import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { knex } from '../database.ts'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists.ts'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/meals',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { id } = request.user!

      const mealSchema = z.object({
        name: z.string(),
        description: z.string(),
        is_diet: z.boolean(),
      })

      const { name, description, is_diet } = mealSchema.parse(request.body)

      console.log({
        id: randomUUID(),
        name,
        description,
        is_diet,
        user_id: id,
      })

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        is_diet,
        user_id: id,
      })

      return reply.status(201).send()
    }
  )
}
