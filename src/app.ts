import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { usersRoutes } from './routes/users.ts'
import { mealsRoutes } from './routes/meals.ts'

export const app = fastify()

app.register(cookie)

app.register(usersRoutes)
app.register(mealsRoutes)
