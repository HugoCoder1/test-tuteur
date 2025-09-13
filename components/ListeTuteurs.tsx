"use client";

import { Tuteur } from "@/types";

interface ListeTuteursProps {
  tuteurs: Tuteur[];
}

export default function ListeTuteurs({ tuteurs }: ListeTuteursProps) {
  const formatCreneaux = (creneaux: any[]) => {
    if (creneaux.length === 0) return "Aucune disponibilité";
    return creneaux
      .map(
        (creneau) => `${creneau.jour} ${creneau.heureDebut}-${creneau.heureFin}`
      )
      .join(", ");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Liste des tuteurs ({tuteurs.length})
      </h3>

      {tuteurs.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
          <p>Aucun tuteur ajouté pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tuteurs.map((tuteur) => (
            <div key={tuteur.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-lg">
                    👨‍🏫 {tuteur.nomComplet}
                  </h4>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Matières:</span>{" "}
                      {tuteur.matieres.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium">Niveaux:</span>{" "}
                      {tuteur.niveaux.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium">Disponibilités:</span>{" "}
                      {formatCreneaux(tuteur.disponibilites)}
                    </p>

                    {(tuteur.experience || tuteur.note) && (
                      <div className="flex gap-4 mt-2">
                        {tuteur.experience && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {tuteur.experience} an(s) d'expérience
                          </span>
                        )}
                        {tuteur.note && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            Note: {tuteur.note}/5
                          </span>
                        )}
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
