export interface Trail {
  id_randonnee: number;
  nom: string;
  distance: number;
  denivele_positif: number;
  duree_estimee: number;
  difficulte: 'facile' | 'modéré' | 'difficile' | 'très difficile';
  description: string;
  localisation_de_depart: string;
  localisation_darrive: string;
  id_parc: number;
  parc_nom?: string;
  parc_localisation?: string;
  rating: number;
  review_count: number;
  summits?: Summit[];
  refuges?: Refuge[];
  guides?: Guide[];
  reviews?: Review[];
}

export interface Summit {
  id_sommet: number;
  nom: string;
  altitude: number;
  temps: number;
  difficulte: string;
}

export interface Refuge {
  id_refuge: number;
  nom: string;
  localisation: string;
  capacite: number;
  contact: string;
  altitude: number;
  gardien: string;
  description: string;
  prix_avec_restauration: number;
  prix_sans_restauration: number;
  responsable_id?: number;
  services?: Service[];
  equipments?: Equipment[];
  guides?: Guide[];
  summits?: Summit[];
}

export interface Service {
  id_service: number;
  nom_service: string;
}

export interface Equipment {
  id_equipement: number;
  nom: string;
}

export interface Guide {
  id_guide_profile: number;
  user_id: number;
  experience: number;
  specialite: string;
  contact_guide: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

export interface Review {
  id_avis: number;
  user_id: number;
  id_randonnee: number;
  note: number;
  commentaire: string;
  date_avis: string;
  nom: string;
  prenom: string;
}

export interface Park {
  id_parc: number;
  nom: string;
  localisation: string;
  description: string;
  trail_count?: number;
  trails?: Trail[];
}

export interface User {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'randonneur' | 'guide' | 'responsable_refuge';
  username: string;
}

export interface ReservationData {
  user_id: number;
  id_refuge: number;
  date_debut: string;
  date_fin: string;
  nombre_personne: number;
  avec_restauration?: boolean;
}