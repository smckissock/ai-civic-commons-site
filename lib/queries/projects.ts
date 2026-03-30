import pool from '@/lib/db'

export interface Project {
  name: string
  url: string
  description: string
  budget_usd: string
  year_start: number | null
  year_end: number | null
  sector: string
  scope: string
  countries: string
  donors: string
  implementing_orgs: string
}

export async function getAllProjects(): Promise<Project[]> {
  const { rows } = await pool.query(`
    SELECT
      p.name,
      p.url,
      p.description,
      p.budget_usd,
      p.year_start,
      p.year_end,
      ps.name  AS sector,
      gj.name  AS scope,
      COALESCE(STRING_AGG(DISTINCT gc.name,  ', ' ORDER BY gc.name), '') AS countries,
      COALESCE(STRING_AGG(DISTINCT od.name,  ', ' ORDER BY od.name), '') AS donors,
      COALESCE(STRING_AGG(DISTINCT oi.name,  ', ' ORDER BY oi.name), '') AS implementing_orgs
    FROM ai.intl_projects p
    JOIN ai.project_sectors   ps  ON ps.id  = p.sector_id
    JOIN ai.geo_jurisdictions  gj  ON gj.id  = p.geo_jurisdiction_id
    LEFT JOIN ai.project_countries        pc  ON pc.project_id = p.id
    LEFT JOIN ai.geo_countries            gc  ON gc.id         = pc.country_id
    LEFT JOIN ai.project_donors           pd  ON pd.project_id = p.id
    LEFT JOIN ai.organizations            od  ON od.id         = pd.org_id AND od.id != 1
    LEFT JOIN ai.project_implementing_orgs pio ON pio.project_id = p.id
    LEFT JOIN ai.organizations            oi  ON oi.id         = pio.org_id AND oi.id != 1
    WHERE p.workflow_status_id = 2
      AND p.id != 1
    GROUP BY p.id, p.name, p.url, p.description, p.budget_usd,
             p.year_start, p.year_end, ps.name, gj.name
    ORDER BY p.year_start DESC NULLS LAST, p.name ASC
  `)
  return rows
}
