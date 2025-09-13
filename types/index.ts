// Types pour le système de matchmaking tuteurs-élèves

export interface Creneau {
  jour: string;
  heureDebut: string;
  heureFin: string;
}

export interface Tuteur {
  id: string;
  nomComplet: string;
  matieres: string[];
  niveaux: string[];
  disponibilites: Creneau[];
  experience?: number; // Bonus : années d'expérience
  note?: number; // Bonus : note moyenne
}

export interface Eleve {
  id: string;
  nomComplet: string;
  matieres: string[];
  niveau: string;
  disponibilites: Creneau[];
  priorite?: "faible" | "moyenne" | "haute"; // Bonus : priorité de l'élève
}

export interface Match {
  tuteur: Tuteur;
  eleve: Eleve;
  score: number; // Score de compatibilité (0-100)
  raisons: string[]; // Raisons du match
  creneauxCommuns: Creneau[]; // Créneaux où ils peuvent se rencontrer
}

export interface ResultatMatchmaking {
  eleve: Eleve;
  matches: Match[];
  meilleurMatch?: Match;
}

// Types pour les formulaires
export interface FormulaireTuteur {
  nomComplet: string;
  matieres: string[];
  niveaux: string[];
  disponibilites: Creneau[];
  experience?: number;
  note?: number;
}

export interface FormulaireEleve {
  nomComplet: string;
  matieres: string[];
  niveau: string;
  disponibilites: Creneau[];
  priorite?: "faible" | "moyenne" | "haute";
}

// Constantes pour les matières et niveaux
export const MATIERES = [
  "Mathématiques",
  "Physique",
  "Chimie",
  "Français",
  "Anglais",
  "Histoire",
  "Géographie",
  "Sciences",
  "Biologie",
  "Philosophie",
  "Économie",
  "Informatique",
] as const;

export const NIVEAUX = [
  "6ème",
  "5ème",
  "4ème",
  "3ème",
  "2nde",
  "1ère",
  "Terminale",
  "Collège",
  "Lycée",
] as const;

export const JOURS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;
