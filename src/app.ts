import fastify from 'fastify'

export const app = fastify()

app.get('/', async (request, reply) => {
  reply.status(200).send({ msg: 'Hello word' })
})
