import { neon } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

export function getDb(): NeonHttpDatabase<typeof schema> {
  const sql = neon(process.env.DATABASE_URL!)
  return drizzle(sql, { schema })
}
