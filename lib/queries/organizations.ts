import pool from '@/lib/db'

export interface Org {
  name: string
  slug: string
  url: string
  description: string
  focus_areas: string
  org_type: string
  country: string
  region: string
  parent_org: string
  article_count: number
  framework_count: number
  program_count: number
  project_count: number
}

export async function getAllOrganizations(): Promise<Org[]> {
  const { rows } = await pool.query(`
    SELECT
      o.name,
      o.slug,
      o.url,
      o.description,
      o.focus_areas,
      ot.name  AS org_type,
      gc.name  AS country,
      gr.name  AS region,
      CASE WHEN po.id IS NOT NULL AND po.id != 1 AND po.id != o.id
           THEN po.name ELSE '' END AS parent_org,
      (SELECT COUNT(*) FROM ai.articles a
         WHERE a.source_org_id = o.id
           AND a.workflow_status_id = 2
           AND a.id != 1)                                        AS article_count,
      (SELECT COUNT(*) FROM ai.governance_frameworks gf
         WHERE gf.issuing_org_id = o.id AND gf.id != 1)         AS framework_count,
      (SELECT COUNT(*) FROM ai.educational_programs ep
         WHERE ep.provider_id = o.id AND ep.id != 1)            AS program_count,
      (SELECT COUNT(*) FROM (
         SELECT project_id FROM ai.project_donors WHERE org_id = o.id
         UNION
         SELECT project_id FROM ai.project_implementing_orgs WHERE org_id = o.id
       ) combined)                                               AS project_count
    FROM ai.organizations o
    JOIN ai.organization_types ot ON ot.id = o.organization_type_id
    JOIN ai.geo_countries      gc ON gc.id = o.country_id
    JOIN ai.geo_regions        gr ON gr.id = gc.region_id
    LEFT JOIN ai.organizations po ON po.id = o.parent_org_id
    WHERE o.id != 1
    ORDER BY o.name ASC
  `)
  return rows.map((r) => ({
    ...r,
    article_count:   Number(r.article_count),
    framework_count: Number(r.framework_count),
    program_count:   Number(r.program_count),
    project_count:   Number(r.project_count),
  }))
}
