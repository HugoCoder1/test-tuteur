"use client";

import { useState } from "react";
import { type FormulaireTuteur, MATIERES, NIVEAUX } from "@/types";
import CreneauInput from "./CreneauInput";
import { Creneau } from "@/types";

interface FormulaireTuteurProps {
  onSubmit: (tuteur: FormulaireTuteur) => void;
  onCancel?: () => void;
}

export default function FormulaireTuteur({
  onSubmit,
  onCancel,
}: FormulaireTuteurProps) {
  const [formData, setFormData] = useState<FormulaireTuteur>({
    nomComplet: "",
    matieres: [],
    niveaux: [],
    disponibilites: [],
    experience: 0,
    note: 0,
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

    if (formData.niveaux.length === 0) {
      newErrors.niveaux = "Au moins un niveau est requis";
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
      niveaux: [],
      disponibilites: [],
      experience: 0,
      note: 0,
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

  const toggleNiveau = (niveau: string) => {
    setFormData((prev) => ({
      ...prev,
      niveaux: prev.niveaux.includes(niveau)
        ? prev.niveaux.filter((n) => n !== niveau)
        : [...prev.niveaux, niveau],
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Ajouter un tuteur
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
            placeholder="Ex: Ahmed Benali"
          />
          {errors.nomComplet && (
            <p className="text-red-500 text-sm mt-1">{errors.nomComplet}</p>
          )}
        </div>

        {/* Matières */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Matières enseignées *
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

        {/* Niveaux */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Niveaux pris en charge *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {NIVEAUX.map((niveau) => (
              <label key={niveau} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.niveaux.includes(niveau)}
                  onChange={() => toggleNiveau(niveau)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{niveau}</span>
              </label>
            ))}
          </div>
          {errors.niveaux && (
            <p className="text-red-500 text-sm mt-1">{errors.niveaux}</p>
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

        {/* Expérience (bonus) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Années d'expérience (optionnel)
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={formData.experience || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                experience: parseInt(e.target.value) || 0,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 3"
          />
        </div>

        {/* Note (bonus) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note moyenne (sur 5) (optionnel)
          </label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.note || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                note: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 4.5"
          />
        </div>

        {/* Boutons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Ajouter le tuteur
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
