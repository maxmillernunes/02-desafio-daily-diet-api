import { app } from './app.ts'

const server = await app.listen({
  host: '0.0.0.0',
  port: 3333,
})

console.log(`Server running on ${server} 🔫🚀`)
