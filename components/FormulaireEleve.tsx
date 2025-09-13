"use client";

import { useState } from "react";
import { type FormulaireEleve, MATIERES, NIVEAUX } from "@/types";
import CreneauInput from "./CreneauInput";
import { Creneau } from "@/types";

interface FormulaireEleveProps {
  onSubmit: (eleve: FormulaireEleve) => void;
  onCancel?: () => void;
}

export default function FormulaireEleve({
  onSubmit,
  onCancel,
}: FormulaireEleveProps) {
  const [formData, setFormData] = useState<FormulaireEleve>({
    nomComplet: "",
    matieres: [],
    niveau: "",
    disponibilites: [],
    priorite: "moyenne",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.nomComplet.trim()) {
      newErrors.nomComplet = "Le nom complet est requis";
    }

    if (formData.matieres.length === 0) {
      newErrors.matieres = "Au moins une matière est requise";
    }

    if (!formData.niveau) {
      newErrors.niveau = "Le niveau scolaire est requis";
    }

    if (formData.disponibilites.length === 0) {
      newErrors.disponibilites = "Au moins une disponibilité est requise";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);

    // Reset form
    setFormData({
      nomComplet: "",
      matieres: [],
      niveau: "",
      disponibilites: [],
      priorite: "moyenne",
    });
  };

  const toggleMatiere = (matiere: string) => {
    setFormData((prev) => ({
      ...prev,
      matieres: prev.matieres.includes(matiere)
        ? prev.matieres.filter((m) => m !== matiere)
        : [...prev.matieres, matiere],
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Ajouter un élève
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom complet */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            value={formData.nomComplet}
            onChange={(e) =>
              setFormData({ ...formData, nomComplet: e.target.value })
            }
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.nomComplet ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ex: Ali Hassan"
          />
          {errors.nomComplet && (
            <p className="text-red-500 text-sm mt-1">{errors.nomComplet}</p>
          )}
        </div>

        {/* Matières */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Matières demandées *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {MATIERES.map((matiere) => (
              <label key={matiere} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.matieres.includes(matiere)}
                  onChange={() => toggleMatiere(matiere)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{matiere}</span>
              </label>
            ))}
          </div>
          {errors.matieres && (
            <p className="text-red-500 text-sm mt-1">{errors.matieres}</p>
          )}
        </div>

        {/* Niveau scolaire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Niveau scolaire *
          </label>
          <select
            value={formData.niveau}
            onChange={(e) =>
              setFormData({ ...formData, niveau: e.target.value })
            }
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.niveau ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Sélectionner un niveau</option>
            {NIVEAUX.map((niveau) => (
              <option key={niveau} value={niveau}>
                {niveau}
              </option>
            ))}
          </select>
          {errors.niveau && (
            <p className="text-red-500 text-sm mt-1">{errors.niveau}</p>
          )}
        </div>

        {/* Disponibilités */}
        <div>
          <CreneauInput
            creneaux={formData.disponibilites}
            onChange={(creneaux: Creneau[]) =>
              setFormData({ ...formData, disponibilites: creneaux })
            }
            label="Disponibilités *"
          />
          {errors.disponibilites && (
            <p className="text-red-500 text-sm mt-1">{errors.disponibilites}</p>
          )}
        </div>

        {/* Priorité (bonus) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priorité (optionnel)
          </label>
          <select
            value={formData.priorite}
            onChange={(e) =>
              setFormData({
                ...formData,
                priorite: e.target.value as "faible" | "moyenne" | "haute",
              })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="faible">Faible</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Ajouter l'élève
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition-colors font-medium"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
