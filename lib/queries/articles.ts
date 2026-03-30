import pool from '@/lib/db'

export interface Article {
  name: string
  url: string
  date_published: Date
  category: string
  source_org: string
  summary: string
}

const BASE_QUERY = `
  SELECT a.name, a.url, a.date_published, a.summary,
         ac.name as category, o.name as source_org
  FROM ai.articles a
  JOIN ai.article_categories ac ON ac.id = a.article_category_id
  JOIN ai.organizations o ON o.id = a.source_org_id
  WHERE a.workflow_status_id = 2
    AND a.id != 1
  ORDER BY a.date_published DESC
`

export async function getArticles(): Promise<Article[]> {
  const { rows } = await pool.query(BASE_QUERY + 'LIMIT 4')
  return rows
}

export async function getAllArticles(): Promise<Article[]> {
  const { rows } = await pool.query(BASE_QUERY)
  return rows
}
