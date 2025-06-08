import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  static async create(userData) {
    const { nom, prenom, email, telephone, role, username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO utilisateur (nom, prenom, email, telephone, role, username, password_hash)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id_user, nom, prenom, email, telephone, role, username
    `;

    const result = await pool.query(query, [
      nom, prenom, email, telephone, role, username, hashedPassword
    ]);

    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = `
      SELECT * FROM utilisateur WHERE email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const query = `
      SELECT * FROM utilisateur WHERE username = $1
    `;
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async getSavedTrails(userId) {
    const query = `
      SELECT 
        r.*,
        p.nom as parc_nom,
        sr.type_sauvegarde
      FROM sauvegarde_randonnee sr
      JOIN randonnee r ON sr.id_randonnee = r.id_randonnee
      LEFT JOIN parc_national p ON r.id_parc = p.id_parc
      WHERE sr.user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async saveTrail(userId, trailId, type) {
    const query = `
      INSERT INTO sauvegarde_randonnee (user_id, id_randonnee, type_sauvegarde)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, id_randonnee, type_sauvegarde) DO NOTHING
      RETURNING *
    `;
    const result = await pool.query(query, [userId, trailId, type]);
    return result.rows[0];
  }

  static async removeSavedTrail(userId, trailId, type) {
    const query = `
      DELETE FROM sauvegarde_randonnee 
      WHERE user_id = $1 AND id_randonnee = $2 AND type_sauvegarde = $3
    `;
    await pool.query(query, [userId, trailId, type]);
  }
}