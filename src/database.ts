import knexPkg, { type Knex } from 'knex'
import { env } from './env/index.ts'

const { knex: knexSetup } = knexPkg

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    directory: './db/migrations',
    extension: 'ts',
  },
}

export const knex = knexSetup(config)
