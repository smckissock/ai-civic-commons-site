import pool from '@/lib/db'

export default async function Home() {
  const result = await pool.query('SELECT COUNT(*) FROM ai.organizations')
  const count = result.rows[0].count
  return <div>Organizations: {count}</div>
}