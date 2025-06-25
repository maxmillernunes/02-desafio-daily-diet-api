import { app } from './app.ts'
import { env } from './env/index.ts'

const server = await app.listen({
  host: env.HOST,
  port: env.PORT,
})

console.log(`Server running on ${server} 🔫🚀`)
