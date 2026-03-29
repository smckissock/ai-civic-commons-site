// test-db.mjs
import pg from 'pg'
import { readFileSync } from 'fs'

// manually read .env.local
const env = readFileSync('.env.local', 'utf8')
const match = env.match(/DATABASE_URL=(.+)/)
const connectionString = match[1].trim()
//const connectionString = 'postgresql://scott:fK3SdDGoVnQDjf14rh7qGQFQidXfUiLr@dpg-cv7cle2j1k6c73ebn1m0-a.oregon-postgres.render.com/usaid'

console.log('Connecting to:', connectionString.replace(/:([^:@]+)@/, ':***@'))

const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })

try {
  const result = await pool.query('SELECT COUNT(*) FROM ai.organizations')
  console.log('Success! Organizations:', result.rows[0].count)
} catch (err) {
  console.error('Error:', err.message)
} finally {
  await pool.end()
}