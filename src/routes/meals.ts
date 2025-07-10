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

  app.put(
    '/meals/:mealId',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const paramsSchema = z.object({
        mealId: z.string().uuid(),
      })

      const mealSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        is_diet: z.boolean().optional(),
      })

      const { mealId } = paramsSchema.parse(request.params)
      const { name, description, is_diet } = mealSchema.parse(request.body)

      const mealExists = await knex('meals').where({ id: mealId }).first()

      if (!mealExists) {
        return reply.status(404).send({ message: 'Meal not found' })
      }

      await knex('meals').where({ id: mealId }).update({
        name,
        description,
        is_diet,
      })

      return reply.status(204).send()
    }
  )

  app.get(
    '/meals',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { id } = request.user!

      const meals = await knex('meals')
        .where({ user_id: id })
        .orderBy('created_at', 'desc')

      return reply.status(200).send({ meals })
    }
  )

  app.get(
    '/meals/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const meal = await knex('meals').where({ id }).first()

      return reply.status(200).send({ meal })
    }
  )

  app.delete(
    '/meals/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const mealExists = await knex('meals').where({ id }).first()

      if (!mealExists) {
        return reply.status(404).send({ message: 'Meal not found' })
      }

      await knex('meals').where({ id }).delete()

      return reply.status(204).send()
    }
  )

  app.get(
    '/metrics',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { id } = request.user!

      const totalMeals = await knex('meals').where({ user_id: id })

      console.log(totalMeals)

      if (!totalMeals.length) {
        return reply.status(200).send({
          totalMeals: 0,
          mealsOnDiet: 0,
          mealsOutOfDiet: 0,
          bestStreak: 0,
        })
      }

      const mealsOnDiet = totalMeals.filter((meal) => meal.is_diet).length

      const mealsOutOfDiet = totalMeals.filter((meal) => !meal.is_diet).length

      const { bestStreak } = totalMeals.reduce(
        (accumulator, meal) => {
          if (meal.is_diet) {
            accumulator.currentStreak += 1
          } else {
            accumulator.currentStreak = 0
          }

          if (accumulator.currentStreak > accumulator.bestStreak) {
            accumulator.bestStreak = accumulator.currentStreak
          }

          return accumulator
        },
        { bestStreak: 0, currentStreak: 0 }
      )

      return reply.status(200).send({
        totalMeals: totalMeals.length,
        mealsOnDiet,
        mealsOutOfDiet,
        bestStreak,
      })
    }
  )
}
