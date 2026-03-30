import pool from '@/lib/db'

export interface OrgProgram {
  name: string
  url: string
  description: string
  level: string
  audience: string
}

export interface OrgFramework {
  name: string
  url: string
  description: string
  framework_type: string
  year_adopted: number | null
}

export interface OrgArticle {
  name: string
  url: string
  summary: string
  category: string
}

export interface OrgProject {
  name: string
  url: string
  description: string
  sector: string
}

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
  programs: OrgProgram[]
  frameworks: OrgFramework[]
  articles: OrgArticle[]
  projects: OrgProject[]
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

      COALESCE((
        SELECT jsonb_agg(
          jsonb_build_object(
            'name', ep.name,
            'url',  COALESCE(ep.url, ''),
            'description', COALESCE(ep.description, ''),
            'level', pl.name,
            'audience', at2.name
          ) ORDER BY ep.name
        )
        FROM ai.educational_programs ep
        JOIN ai.program_levels  pl  ON pl.id  = ep.program_level_id
        JOIN ai.audience_types  at2 ON at2.id = ep.audience_type_id
        WHERE ep.provider_id = o.id AND ep.id != 1
      ), '[]'::jsonb) AS programs,

      COALESCE((
        SELECT jsonb_agg(
          jsonb_build_object(
            'name', gf.name,
            'url',  COALESCE(gf.url, ''),
            'description', COALESCE(gf.description, ''),
            'framework_type', ft.name,
            'year_adopted', gf.year_adopted
          ) ORDER BY gf.year_adopted DESC NULLS LAST, gf.name
        )
        FROM ai.governance_frameworks gf
        JOIN ai.framework_types ft ON ft.id = gf.framework_type_id
        WHERE gf.issuing_org_id = o.id AND gf.id != 1
      ), '[]'::jsonb) AS frameworks,

      COALESCE((
        SELECT jsonb_agg(
          jsonb_build_object(
            'name', a.name,
            'url',  a.url,
            'summary', COALESCE(a.summary, ''),
            'category', ac.name
          ) ORDER BY a.date_published DESC
        )
        FROM ai.articles a
        JOIN ai.article_categories ac ON ac.id = a.article_category_id
        WHERE a.source_org_id = o.id
          AND a.workflow_status_id = 2
          AND a.id != 1
      ), '[]'::jsonb) AS articles,

      COALESCE((
        SELECT jsonb_agg(
          jsonb_build_object(
            'name', p.name,
            'url',  COALESCE(p.url, ''),
            'description', COALESCE(p.description, ''),
            'sector', ps.name
          ) ORDER BY p.name
        )
        FROM (
          SELECT DISTINCT project_id
          FROM ai.project_donors WHERE org_id = o.id
          UNION
          SELECT DISTINCT project_id
          FROM ai.project_implementing_orgs WHERE org_id = o.id
        ) proj_ids
        JOIN ai.intl_projects   p  ON p.id  = proj_ids.project_id
        JOIN ai.project_sectors ps ON ps.id = p.sector_id
        WHERE p.workflow_status_id = 2 AND p.id != 1
      ), '[]'::jsonb) AS projects

    FROM ai.organizations o
    JOIN ai.organization_types ot ON ot.id = o.organization_type_id
    JOIN ai.geo_countries      gc ON gc.id = o.country_id
    JOIN ai.geo_regions        gr ON gr.id = gc.region_id
    LEFT JOIN ai.organizations po ON po.id = o.parent_org_id
    WHERE o.id != 1
    ORDER BY o.name ASC
  `)
  return rows as Org[]
}
