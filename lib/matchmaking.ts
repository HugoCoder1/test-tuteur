import { Tuteur, Eleve, Match, ResultatMatchmaking, Creneau } from "@/types";

/**
 * Algorithme de matchmaking entre tuteurs et élèves
 * Évalue la compatibilité basée sur :
 * - Matières enseignées/demandées
 * - Niveau scolaire
 * - Disponibilités communes
 * - Bonus : expérience et note du tuteur
 */

export class MatchmakingEngine {
  private tuteurs: Tuteur[] = [];
  private eleves: Eleve[] = [];

  constructor(tuteurs: Tuteur[] = [], eleves: Eleve[] = []) {
    this.tuteurs = tuteurs;
    this.eleves = eleves;
  }

  /**
   * Ajoute un tuteur à la liste
   */
  ajouterTuteur(tuteur: Tuteur): void {
    this.tuteurs.push(tuteur);
  }

  /**
   * Ajoute un élève à la liste
   */
  ajouterEleve(eleve: Eleve): void {
    this.eleves.push(eleve);
  }

  /**
   * Trouve les créneaux communs entre un tuteur et un élève
   */
  private trouverCreneauxCommuns(tuteur: Tuteur, eleve: Eleve): Creneau[] {
    const creneauxCommuns: Creneau[] = [];

    for (const creneauTuteur of tuteur.disponibilites) {
      for (const creneauEleve of eleve.disponibilites) {
        if (this.creneauxSeChevauchent(creneauTuteur, creneauEleve)) {
          creneauxCommuns.push(
            this.creerCreneauCommun(creneauTuteur, creneauEleve)
          );
        }
      }
    }

    return creneauxCommuns;
  }

  /**
   * Vérifie si deux créneaux se chevauchent
   */
  private creneauxSeChevauchent(creneau1: Creneau, creneau2: Creneau): boolean {
    if (creneau1.jour !== creneau2.jour) return false;

    const heure1Debut = this.convertirHeureEnMinutes(creneau1.heureDebut);
    const heure1Fin = this.convertirHeureEnMinutes(creneau1.heureFin);
    const heure2Debut = this.convertirHeureEnMinutes(creneau2.heureDebut);
    const heure2Fin = this.convertirHeureEnMinutes(creneau2.heureFin);

    return heure1Debut < heure2Fin && heure2Debut < heure1Fin;
  }

  /**
   * Crée un créneau commun à partir de deux créneaux qui se chevauchent
   */
  private creerCreneauCommun(creneau1: Creneau, creneau2: Creneau): Creneau {
    const heure1Debut = this.convertirHeureEnMinutes(creneau1.heureDebut);
    const heure1Fin = this.convertirHeureEnMinutes(creneau1.heureFin);
    const heure2Debut = this.convertirHeureEnMinutes(creneau2.heureDebut);
    const heure2Fin = this.convertirHeureEnMinutes(creneau2.heureFin);

    const debutCommun = Math.max(heure1Debut, heure2Debut);
    const finCommune = Math.min(heure1Fin, heure2Fin);

    return {
      jour: creneau1.jour,
      heureDebut: this.convertirMinutesEnHeure(debutCommun),
      heureFin: this.convertirMinutesEnHeure(finCommune),
    };
  }

  /**
   * Convertit une heure (HH:MM) en minutes
   */
  private convertirHeureEnMinutes(heure: string): number {
    const [heures, minutes] = heure.split(":").map(Number);
    return heures * 60 + minutes;
  }

  /**
   * Convertit des minutes en heure (HH:MM)
   */
  private convertirMinutesEnHeure(minutes: number): string {
    const heures = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${heures.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }

  private calculerScore(
    tuteur: Tuteur,
    eleve: Eleve,
    creneauxCommuns: Creneau[]
  ) {
    let score = 0;
    const raisons = [];

    // Vérifier les matières
    const matieresCommunes = tuteur.matieres.filter((m) =>
      eleve.matieres.includes(m)
    );
    if (matieresCommunes.length === 0) {
      raisons.push("Aucune matière commune");
      return { score: 0, raisons };
    }
    score += 50;
    raisons.push(`Matières communes: ${matieresCommunes.join(", ")}`);

    // Vérifier le niveau
    if (tuteur.niveaux.includes(eleve.niveau)) {
      score += 30;
      raisons.push(`Niveau correspondant: ${eleve.niveau}`);
    } else {
      raisons.push(`Niveau non correspondant`);
      return { score, raisons };
    }

    // Vérifier les disponibilités
    if (creneauxCommuns.length > 0) {
      if (creneauxCommuns.length >= 2) {
        score += 20;
        raisons.push("Disponibilité parfaite");
      } else {
        score += 15;
        raisons.push("Disponibilité partielle");
      }
    } else {
      raisons.push("Aucun créneau commun");
      return { score, raisons };
    }

    return { score, raisons };
  }

  /**
   * Trouve tous les matches pour un élève donné
   */
  trouverMatchesPourEleve(eleve: Eleve): Match[] {
    const matches: Match[] = [];

    for (const tuteur of this.tuteurs) {
      const creneauxCommuns = this.trouverCreneauxCommuns(tuteur, eleve);
      const { score, raisons } = this.calculerScore(
        tuteur,
        eleve,
        creneauxCommuns
      );

      // On inclut tous les matches, même avec un score faible
      matches.push({
        tuteur,
        eleve,
        score,
        raisons,
        creneauxCommuns,
      });
    }

    // Tri par score décroissant
    return matches.sort((a, b) => b.score - a.score);
  }

  /**
   * Effectue le matchmaking pour tous les élèves
   */
  effectuerMatchmaking(): ResultatMatchmaking[] {
    return this.eleves.map((eleve) => {
      const matches = this.trouverMatchesPourEleve(eleve);
      const meilleurMatch = matches.length > 0 ? matches[0] : undefined;

      return {
        eleve,
        matches,
        meilleurMatch,
      };
    });
  }

  /**
   * Trouve le meilleur tuteur pour un élève spécifique
   */
  trouverMeilleurTuteur(eleve: Eleve): Match | null {
    const matches = this.trouverMatchesPourEleve(eleve);
    return matches.length > 0 ? matches[0] : null;
  }

  /**
   * Obtient la liste des tuteurs
   */
  obtenirTuteurs(): Tuteur[] {
    return [...this.tuteurs];
  }

  /**
   * Obtient la liste des élèves
   */
  obtenirEleves(): Eleve[] {
    return [...this.eleves];
  }

  /**
   * Obtient les statistiques du matchmaking
   */
  obtenirStatistiques(): {
    totalTuteurs: number;
    totalEleves: number;
    totalMatches: number;
    matchesParfaits: number;
    moyenneScore: number;
  } {
    const resultats = this.effectuerMatchmaking();
    const totalMatches = resultats.reduce(
      (total, resultat) => total + resultat.matches.length,
      0
    );
    const matchesParfaits = resultats.filter(
      (r) => r.meilleurMatch && r.meilleurMatch.score >= 80
    ).length;

    const tousLesScores = resultats.flatMap((r) =>
      r.matches.map((m) => m.score)
    );
    const moyenneScore =
      tousLesScores.length > 0
        ? tousLesScores.reduce((sum, score) => sum + score, 0) /
          tousLesScores.length
        : 0;

    return {
      totalTuteurs: this.tuteurs.length,
      totalEleves: this.eleves.length,
      totalMatches,
      matchesParfaits,
      moyenneScore: Math.round(moyenneScore),
    };
  }
}

// Charger les données depuis le fichier JSON
export async function chargerDonnees(): Promise<{
  tuteurs: Tuteur[];
  eleves: Eleve[];
}> {
  try {
    const response = await fetch("/data/exemple.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    return { tuteurs: [], eleves: [] };
  }
}
