import pool from '@/lib/db'

export interface Framework {
  name: string
  slug: string
  url: string
  description: string
  key_principles: string
  notes: string
  year_adopted: number | null
  year_updated: number | null
  framework_type: string
  binding_type: string
  scope: string
  issuing_org: string
  issuing_org_url: string
}

export async function getAllFrameworks(): Promise<Framework[]> {
  const { rows } = await pool.query(`
    SELECT
      f.name,
      f.slug,
      f.url,
      f.description,
      f.key_principles,
      f.notes,
      f.year_adopted,
      f.year_updated,
      ft.name AS framework_type,
      bt.name AS binding_type,
      gj.name AS scope,
      o.name  AS issuing_org,
      o.url   AS issuing_org_url
    FROM ai.governance_frameworks f
    JOIN ai.framework_types   ft ON ft.id = f.framework_type_id
    JOIN ai.binding_types     bt ON bt.id = f.binding_type_id
    JOIN ai.geo_jurisdictions gj ON gj.id = f.geographic_scope_id
    JOIN ai.organizations     o  ON o.id  = f.issuing_org_id
    WHERE f.id != 1
    ORDER BY f.year_adopted DESC NULLS LAST, f.name ASC
  `)
  return rows
}
