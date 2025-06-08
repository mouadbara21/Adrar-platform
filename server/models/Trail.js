import pool from '../config/database.js';

export class Trail {
  static async getAll() {
    const query = `
      SELECT 
        r.*,
        p.nom as parc_nom,
        p.localisation as parc_localisation,
        COALESCE(AVG(ar.note), 0) as rating,
        COUNT(ar.id_avis) as review_count
      FROM randonnee r
      LEFT JOIN parc_national p ON r.id_parc = p.id_parc
      LEFT JOIN avis_randonnee ar ON r.id_randonnee = ar.id_randonnee
      GROUP BY r.id_randonnee, p.nom, p.localisation
      ORDER BY r.nom
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = `
      SELECT 
        r.*,
        p.nom as parc_nom,
        p.localisation as parc_localisation,
        p.description as parc_description,
        COALESCE(AVG(ar.note), 0) as rating,
        COUNT(ar.id_avis) as review_count
      FROM randonnee r
      LEFT JOIN parc_national p ON r.id_parc = p.id_parc
      LEFT JOIN avis_randonnee ar ON r.id_randonnee = ar.id_randonnee
      WHERE r.id_randonnee = $1
      GROUP BY r.id_randonnee, p.nom, p.localisation, p.description
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getSummits(trailId) {
    const query = `
      SELECT s.*
      FROM sommet s
      JOIN randonnee_sommet rs ON s.id_sommet = rs.id_sommet
      WHERE rs.id_randonnee = $1
      ORDER BY rs.ordre_visite
    `;
    const result = await pool.query(query, [trailId]);
    return result.rows;
  }

  static async getRefuges(trailId) {
    const query = `
      SELECT r.*
      FROM refuge r
      JOIN randonnee_refuge rr ON r.id_refuge = rr.id_refuge
      WHERE rr.id_randonnee = $1
    `;
    const result = await pool.query(query, [trailId]);
    return result.rows;
  }

  static async getGuides(trailId) {
    const query = `
      SELECT 
        gp.*,
        u.nom,
        u.prenom,
        u.email,
        u.telephone
      FROM guide_profile gp
      JOIN utilisateur u ON gp.user_id = u.id_user
      JOIN randonnee_guide rg ON gp.id_guide = rg.id_guide
      WHERE rg.id_randonnee = $1
    `;
    const result = await pool.query(query, [trailId]);
    return result.rows;
  }

  static async getReviews(trailId) {
    const query = `
      SELECT 
        ar.*,
        u.nom,
        u.prenom
      FROM avis_randonnee ar
      JOIN utilisateur u ON ar.user_id = u.id_user
      WHERE ar.id_randonnee = $1
      ORDER BY ar.date_avis DESC
    `;
    const result = await pool.query(query, [trailId]);
    return result.rows;
  }

  static async search(searchTerm, difficulty, parc) {
    let query = `
      SELECT 
        r.*,
        p.nom as parc_nom,
        p.localisation as parc_localisation,
        COALESCE(AVG(ar.note), 0) as rating,
        COUNT(ar.id_avis) as review_count
      FROM randonnee r
      LEFT JOIN parc_national p ON r.id_parc = p.id_parc
      LEFT JOIN avis_randonnee ar ON r.id_randonnee = ar.id_randonnee
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;

    if (searchTerm) {
      paramCount++;
      query += ` AND (r.nom ILIKE $${paramCount} OR r.description ILIKE $${paramCount})`;
      params.push(`%${searchTerm}%`);
    }

    if (difficulty) {
      paramCount++;
      query += ` AND r.difficulte = $${paramCount}`;
      params.push(difficulty);
    }

    if (parc) {
      paramCount++;
      query += ` AND r.id_parc = $${paramCount}`;
      params.push(parc);
    }

    query += ` GROUP BY r.id_randonnee, p.nom, p.localisation ORDER BY r.nom`;

    const result = await pool.query(query, params);
    return result.rows;
  }
}