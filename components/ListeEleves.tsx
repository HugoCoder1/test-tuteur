"use client";

import { Eleve } from "@/types";

interface ListeElevesProps {
  eleves: Eleve[];
}

export default function ListeEleves({ eleves }: ListeElevesProps) {
  const formatCreneaux = (creneaux: any[]) => {
    if (creneaux.length === 0) return "Aucune disponibilité";
    return creneaux
      .map(
        (creneau) => `${creneau.jour} ${creneau.heureDebut}-${creneau.heureFin}`
      )
      .join(", ");
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case "haute":
        return "bg-red-100 text-red-800";
      case "moyenne":
        return "bg-yellow-100 text-yellow-800";
      case "faible":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Liste des élèves ({eleves.length})
      </h3>

      {eleves.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
          <p>Aucun élève ajouté pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {eleves.map((eleve) => (
            <div key={eleve.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-lg">
                    👨‍🎓 {eleve.nomComplet}
                  </h4>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Matières demandées:</span>{" "}
                      {eleve.matieres.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium">Niveau:</span>{" "}
                      {eleve.niveau}
                    </p>
                    <p>
                      <span className="font-medium">Disponibilités:</span>{" "}
                      {formatCreneaux(eleve.disponibilites)}
                    </p>

                    {eleve.priorite && (
                      <div className="mt-2">
                        <span
                          className={`px-2 py-1 text-xs rounded ${getPrioriteColor(
                            eleve.priorite
                          )}`}
                        >
                          Priorité: {eleve.priorite}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
