import 'dotenv/config'
import { z } from 'zod'

const envs = z.object({
  NODE_ENV: z.enum(['production', 'development']).default('development'),
  DATABASE_CLIENT: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('0.0.0.0'),
})

const _envs = envs.safeParse(process.env)

if (!_envs.success) {
  throw new Error('Invalid envs variables')
}

export const env = _envs.data
