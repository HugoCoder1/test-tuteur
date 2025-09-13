"use client";

import { useState } from "react";
import { Creneau, JOURS } from "@/types";

interface CreneauInputProps {
  creneaux: Creneau[];
  onChange: (creneaux: Creneau[]) => void;
  label?: string;
}

export default function CreneauInput({
  creneaux,
  onChange,
  label = "Disponibilités",
}: CreneauInputProps) {
  const [nouveauCreneau, setNouveauCreneau] = useState<Creneau>({
    jour: "Lundi",
    heureDebut: "09:00",
    heureFin: "10:00",
  });

  const ajouterCreneau = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (nouveauCreneau.heureDebut < nouveauCreneau.heureFin) {
      onChange([...creneaux, nouveauCreneau]);
      setNouveauCreneau({
        jour: "Lundi",
        heureDebut: "09:00",
        heureFin: "10:00",
      });
    }
  };

  const supprimerCreneau = (index: number) => {
    const nouveauxCreneaux = creneaux.filter((_, i) => i !== index);
    onChange(nouveauxCreneaux);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{label}</h3>

      {/* Liste des créneaux existants */}
      {creneaux.length > 0 && (
        <div className="space-y-2">
          {creneaux.map((creneau, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
            >
              <span className="text-sm font-medium">
                {creneau.jour} : {creneau.heureDebut} - {creneau.heureFin}
              </span>
              <button
                onClick={() => supprimerCreneau(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Formulaire pour ajouter un nouveau créneau */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h4 className="font-medium text-gray-700">Ajouter un créneau</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jour
            </label>
            <select
              value={nouveauCreneau.jour}
              onChange={(e) =>
                setNouveauCreneau({ ...nouveauCreneau, jour: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {JOURS.map((jour) => (
                <option key={jour} value={jour}>
                  {jour}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure de début
            </label>
            <input
              type="time"
              value={nouveauCreneau.heureDebut}
              onChange={(e) =>
                setNouveauCreneau({
                  ...nouveauCreneau,
                  heureDebut: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure de fin
            </label>
            <input
              type="time"
              value={nouveauCreneau.heureFin}
              onChange={(e) =>
                setNouveauCreneau({
                  ...nouveauCreneau,
                  heureFin: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={ajouterCreneau}
          disabled={nouveauCreneau.heureDebut >= nouveauCreneau.heureFin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Ajouter le créneau
        </button>
      </div>
    </div>
  );
}
