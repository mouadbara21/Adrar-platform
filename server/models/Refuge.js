import pool from '../config/database.js';

export class Refuge {
  static async getAll() {
    const query = `
      SELECT * FROM refuge
      ORDER BY nom
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = `
      SELECT * FROM refuge WHERE id_refuge = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getServices(refugeId) {
    const query = `
      SELECT s.*
      FROM service s
      JOIN relier r ON s.id_service = r.id_service
      WHERE r.id_refuge = $1
    `;
    const result = await pool.query(query, [refugeId]);
    return result.rows;
  }

  static async getEquipments(refugeId) {
    const query = `
      SELECT e.*
      FROM equipement e
      JOIN posseder p ON e.id_equipement = p.id_equipement
      WHERE p.id_refuge = $1
    `;
    const result = await pool.query(query, [refugeId]);
    return result.rows;
  }

  static async getGuides(refugeId) {
    const query = `
      SELECT 
        gp.*,
        u.nom,
        u.prenom,
        u.email,
        u.telephone
      FROM guide_profile gp
      JOIN utilisateur u ON gp.user_id = u.id_user
      JOIN fournir f ON gp.id_guide = f.id_guide_profile_easyhike
      WHERE f.id_refuge = $1
    `;
    const result = await pool.query(query, [refugeId]);
    return result.rows;
  }

  static async getSummits(refugeId) {
    const query = `
      SELECT s.*
      FROM sommet s
      JOIN relier_sommet_refuge rsr ON s.id_sommet = rsr.id_sommet
      WHERE rsr.id_refuge = $1
    `;
    const result = await pool.query(query, [refugeId]);
    return result.rows;
  }

  static async createReservation(reservationData) {
    const {
      user_id,
      id_refuge,
      date_debut,
      date_fin,
      nombre_personne,
      avec_restauration
    } = reservationData;

    const query = `
      INSERT INTO reservation_refuge 
      (date_reservation, date_debut, date_fin, nombre_personne, etat_reservation, user_id, id_refuge)
      VALUES (CURRENT_DATE, $1, $2, $3, 'en attente', $4, $5)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      date_debut,
      date_fin,
      nombre_personne,
      user_id,
      id_refuge
    ]);
    
    return result.rows[0];
  }
}