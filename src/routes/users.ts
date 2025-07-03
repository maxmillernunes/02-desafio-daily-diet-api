import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database.ts'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists.ts'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = userSchema.parse(request.body)

    const userAlreadyExists = await knex('users').where('email', email).first()

    if (userAlreadyExists) {
      return reply.status(400).send({ message: 'User already exists' })
    }

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      session_id: randomUUID(),
    })

    return reply.status(201).send()
  })

  app.post('/users/sessions', async (request, reply) => {
    const loginSchema = z.object({
      email: z.string().email(),
    })

    const { email } = loginSchema.parse(request.body)

    const user = await knex('users').where('email', email).first()

    if (!user) {
      return reply.status(400).send({ message: 'User not found' })
    }

    reply.cookie('sessionId', user.session_id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    return reply.status(200).send({ user })
  })

  app.get(
    '/users/me',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const user = request.user

      return reply.status(200).send({ user })
    }
  )
}
