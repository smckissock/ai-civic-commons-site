import pool from '@/lib/db'

export interface Program {
  name: string
  slug: string
  url: string
  description: string
  provider: string
  audience: string
  level: string
  // Topic coverage ratings: 'High' | 'Medium' | 'Low' | 'Unspecified'
  emotional_readiness: string
  misinformation: string
  human_ai_interaction: string
  ethics_in_practice: string
  systems_thinking: string
  workforce_guidance: string
  equity_access: string
  trust_calibration: string
  failure_literacy: string
  behavioral_norms: string
}


export async function getAllPrograms(): Promise<Program[]> {
  const { rows } = await pool.query(`
    SELECT
      p.name,
      p.slug,
      p.url,
      p.description,
      o.name   AS provider,
      at2.name AS audience,
      pl.name  AS level,
      r_er.name  AS emotional_readiness,
      r_mi.name  AS misinformation,
      r_hai.name AS human_ai_interaction,
      r_eip.name AS ethics_in_practice,
      r_st.name  AS systems_thinking,
      r_wg.name  AS workforce_guidance,
      r_ea.name  AS equity_access,
      r_tc.name  AS trust_calibration,
      r_fl.name  AS failure_literacy,
      r_bn.name  AS behavioral_norms
    FROM ai.educational_programs p
    JOIN ai.organizations    o    ON o.id    = p.provider_id
    JOIN ai.audience_types   at2  ON at2.id  = p.audience_type_id
    JOIN ai.program_levels   pl   ON pl.id   = p.program_level_id
    JOIN ai.rating_levels    r_er  ON r_er.id  = p.emotional_readiness_id
    JOIN ai.rating_levels    r_mi  ON r_mi.id  = p.misinformation_id
    JOIN ai.rating_levels    r_hai ON r_hai.id = p.human_ai_interaction_id
    JOIN ai.rating_levels    r_eip ON r_eip.id = p.ethics_in_practice_id
    JOIN ai.rating_levels    r_st  ON r_st.id  = p.systems_thinking_id
    JOIN ai.rating_levels    r_wg  ON r_wg.id  = p.workforce_guidance_id
    JOIN ai.rating_levels    r_ea  ON r_ea.id  = p.equity_access_id
    JOIN ai.rating_levels    r_tc  ON r_tc.id  = p.trust_calibration_id
    JOIN ai.rating_levels    r_fl  ON r_fl.id  = p.failure_literacy_id
    JOIN ai.rating_levels    r_bn  ON r_bn.id  = p.behavioral_norms_id
    WHERE p.id != 1
    ORDER BY p.name ASC
  `)
  return rows
}
