import pool from '../config/database.js';

export class Park {
  static async getAll() {
    const query = `
      SELECT 
        p.*,
        COUNT(r.id_randonnee) as trail_count
      FROM parc_national p
      LEFT JOIN randonnee r ON p.id_parc = r.id_parc
      GROUP BY p.id_parc
      ORDER BY p.nom
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = `
      SELECT * FROM parc_national WHERE id_parc = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getTrails(parkId) {
    const query = `
      SELECT 
        r.*,
        COALESCE(AVG(ar.note), 0) as rating,
        COUNT(ar.id_avis) as review_count
      FROM randonnee r
      LEFT JOIN avis_randonnee ar ON r.id_randonnee = ar.id_randonnee
      WHERE r.id_parc = $1
      GROUP BY r.id_randonnee
      ORDER BY r.nom
    `;
    const result = await pool.query(query, [parkId]);
    return result.rows;
  }
}