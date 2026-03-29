import pool from '@/lib/db'

export interface Stats {
  programs: number
  frameworks: number
  orgs: number
  projects: number
}

export async function getStats(): Promise<Stats> {
  const { rows } = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM ai.educational_programs WHERE id != 1) as programs,
      (SELECT COUNT(*) FROM ai.governance_frameworks WHERE id != 1) as frameworks,
      (SELECT COUNT(*) FROM ai.organizations WHERE id != 1) as orgs,
      (SELECT COUNT(*) FROM ai.intl_projects WHERE id != 1) as projects
  `)
  return {
    programs: Number(rows[0].programs),
    frameworks: Number(rows[0].frameworks),
    orgs: Number(rows[0].orgs),
    projects: Number(rows[0].projects),
  }
}
