import { MetadataRoute } from 'next'
import pool from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.aiciviccommons.org'

  const programs = await pool.query(
    `SELECT slug, updated_at FROM ai.educational_programs WHERE id != 1`
  )
  const orgs = await pool.query(
    `SELECT slug, updated_at FROM ai.organizations WHERE id != 1`
  )
  const frameworks = await pool.query(
    `SELECT slug, updated_at FROM ai.governance_frameworks WHERE id != 1`
  )
  const articles = await pool.query(
    `SELECT slug, updated_at FROM ai.articles WHERE id != 1`
  )

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/programs`, lastModified: new Date() },
    { url: `${base}/organizations`, lastModified: new Date() },
    { url: `${base}/frameworks`, lastModified: new Date() },
    { url: `${base}/articles`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    ...programs.rows.map(r => ({
      url: `${base}/programs/${r.slug}`,
      lastModified: r.updated_at,
    })),
    ...orgs.rows.map(r => ({
      url: `${base}/organizations/${r.slug}`,
      lastModified: r.updated_at,
    })),
    ...frameworks.rows.map(r => ({
      url: `${base}/frameworks/${r.slug}`,
      lastModified: r.updated_at,
    })),
    ...articles.rows.map(r => ({
      url: `${base}/articles/${r.slug}`,
      lastModified: r.updated_at,
    })),
  ]
}