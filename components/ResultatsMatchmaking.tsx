"use client";

import { ResultatMatchmaking, Match } from "@/types";

interface ResultatsMatchmakingProps {
  resultats: ResultatMatchmaking[];
}

export default function ResultatsMatchmaking({
  resultats,
}: ResultatsMatchmakingProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    if (score >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Match parfait";
    if (score >= 60) return "Bon match";
    if (score >= 40) return "Match partiel";
    return "Match faible";
  };

  const formatCreneaux = (creneaux: any[]) => {
    if (creneaux.length === 0) return "Aucun créneau commun";
    return creneaux
      .map(
        (creneau) => `${creneau.jour} ${creneau.heureDebut}-${creneau.heureFin}`
      )
      .join(", ");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Résultats du matchmaking ({resultats.length} élève
        {resultats.length > 1 ? "s" : ""})
      </h2>

      {resultats.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
          <p>Aucun élève trouvé avec les filtres sélectionnés.</p>
        </div>
      ) : (
        resultats.map((resultat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            {/* En-tête de l'élève */}
            <div className="border-b border-gray-200 pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                👨‍🎓 {resultat.eleve.nomComplet}
              </h3>
              <div className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Matières:</span>{" "}
                {resultat.eleve.matieres.join(", ")} •
                <span className="font-medium ml-2">Niveau:</span>{" "}
                {resultat.eleve.niveau}
              </div>
            </div>

            {/* Meilleur match */}
            {resultat.meilleurMatch && resultat.meilleurMatch.score > 0 ? (
              <div className="mb-4">
                <h4 className="text-md font-semibold text-green-700 mb-2">
                  🎯 Meilleur match
                </h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">
                        👨‍🏫 {resultat.meilleurMatch.tuteur.nomComplet}
                      </h5>
                      <div className="mt-1 text-sm text-gray-600">
                        <p>
                          <strong>Matières:</strong>{" "}
                          {resultat.meilleurMatch.tuteur.matieres.join(", ")}
                        </p>
                        <p>
                          <strong>Niveaux:</strong>{" "}
                          {resultat.meilleurMatch.tuteur.niveaux.join(", ")}
                        </p>
                        <p>
                          <strong>Disponibilités:</strong>{" "}
                          {formatCreneaux(
                            resultat.meilleurMatch.creneauxCommuns
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                          resultat.meilleurMatch.score
                        )}`}
                      >
                        {resultat.meilleurMatch.score}% -{" "}
                        {getScoreLabel(resultat.meilleurMatch.score)}
                      </div>
                    </div>
                  </div>

                  {/* Raisons du match */}
                  <div className="mt-3">
                    <h6 className="text-sm font-medium text-gray-700 mb-1">
                      Critères de match:
                    </h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {resultat.meilleurMatch.raisons.map((raison, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          {raison}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">
                   Aucun tuteur correspondant trouvé
                </p>
                <p className="text-red-600 text-sm mt-1">
                  Aucun tuteur ne correspond aux critères de cet élève (matière,
                  niveau, disponibilités).
                </p>
              </div>
            )}

            {/* Autres matches disponibles */}
            {resultat.matches.length > 1 && (
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Autres tuteurs disponibles ({resultat.matches.length - 1})
                </h4>
                <div className="space-y-2">
                  {resultat.matches.slice(1, 4).map((match, matchIndex) => (
                    <div
                      key={matchIndex + 1}
                      className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">
                            {match.tuteur.nomComplet}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {match.tuteur.matieres.join(", ")} •{" "}
                            {match.tuteur.niveaux.join(", ")}
                          </p>
                        </div>
                        <div className="ml-4">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(
                              match.score
                            )}`}
                          >
                            {match.score}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
