"use client";

import React, { useState, useEffect } from "react";
import { MatchmakingEngine, chargerDonnees } from "@/lib/matchmaking";
import {
  Tuteur,
  Eleve,
  ResultatMatchmaking,
  type FormulaireTuteur,
  type FormulaireEleve,
} from "@/types";
import FormulaireTuteurComponent from "@/components/FormulaireTuteur";
import FormulaireEleveComponent from "@/components/FormulaireEleve";
import ResultatsMatchmaking from "@/components/ResultatsMatchmaking";
import ListeTuteurs from "@/components/ListeTuteurs";
import ListeEleves from "@/components/ListeEleves";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [engine] = useState(() => new MatchmakingEngine());
  const [tuteurs, setTuteurs] = useState<Tuteur[]>([]);
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [resultats, setResultats] = useState<ResultatMatchmaking[]>([]);
  const [activeTab, setActiveTab] = useState<"ajout" | "resultats" | "listes">(
    "resultats"
  );
  const [showFormulaireTuteur, setShowFormulaireTuteur] = useState(false);
  const [showFormulaireEleve, setShowFormulaireEleve] = useState(false);
  const [filtreMatiere, setFiltreMatiere] = useState<string>("");
  const [filtreNiveau, setFiltreNiveau] = useState<string>("");

  const mettreAJourResultats = () => {
    const nouveauxResultats = engine.effectuerMatchmaking();
    setResultats(nouveauxResultats);
    setTuteurs(engine.obtenirTuteurs());
    setEleves(engine.obtenirEleves());
  };

  const handleAjouterTuteur = (formData: FormulaireTuteur) => {
    const nouveauTuteur: Tuteur = {
      id: Date.now().toString(),
      ...formData,
    };
    engine.ajouterTuteur(nouveauTuteur);
    setShowFormulaireTuteur(false);
    mettreAJourResultats();
    toast.success("Tuteur ajouté avec succès !");
  };

  const handleAjouterEleve = (formData: FormulaireEleve) => {
    const nouvelEleve: Eleve = {
      id: Date.now().toString(),
      ...formData,
    };
    engine.ajouterEleve(nouvelEleve);
    setShowFormulaireEleve(false);
    mettreAJourResultats();
    toast.success("Élève ajouté avec succès !");
  };

  // Charger les données au démarrage
  useEffect(() => {
    const chargerDonneesInitiales = async () => {
      try {
        const { tuteurs, eleves } = await chargerDonnees();
        tuteurs.forEach((tuteur) => engine.ajouterTuteur(tuteur));
        eleves.forEach((eleve) => engine.ajouterEleve(eleve));
        mettreAJourResultats();
        toast.success("Données chargées avec succès !");
      } catch (error) {
        toast.error("Erreur lors du chargement des données");
      }
    };

    chargerDonneesInitiales();
  }, []);

  // Filtrer les résultats
  const resultatsFiltres = resultats.filter((resultat) => {
    const matchMatiere =
      !filtreMatiere || resultat.eleve.matieres.includes(filtreMatiere);
    const matchNiveau = !filtreNiveau || resultat.eleve.niveau === filtreNiveau;
    return matchMatiere && matchNiveau;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête simple */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            🎓 Matchmaking Tuteurs-Élèves
          </h1>
          <p className="mt-1 text-gray-600">
            Trouvez le tuteur parfait basé sur les matières, niveaux et
            disponibilités
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Navigation simple */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("resultats")}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === "resultats"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              📊 Résultats
            </button>
            <button
              onClick={() => setActiveTab("listes")}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === "listes"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              📋 Listes
            </button>
            <button
              onClick={() => setActiveTab("ajout")}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === "ajout"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ➕ Ajouter des données
            </button>
          </nav>
        </div>

        {/* Contenu */}
        {activeTab === "resultats" && (
          <div className="space-y-6">
            {/* Filtres simples */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Filtres</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Matière
                  </label>
                  <select
                    value={filtreMatiere}
                    onChange={(e) => setFiltreMatiere(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Toutes les matières</option>
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Physique">Physique</option>
                    <option value="Français">Français</option>
                    <option value="Anglais">Anglais</option>
                    <option value="Histoire">Histoire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau
                  </label>
                  <select
                    value={filtreNiveau}
                    onChange={(e) => setFiltreNiveau(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Tous les niveaux</option>
                    <option value="Collège">Collège</option>
                    <option value="Lycée">Lycée</option>
                    <option value="Terminale">Terminale</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <ResultatsMatchmaking resultats={resultatsFiltres} />
          </div>
        )}

        {activeTab === "listes" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ListeTuteurs tuteurs={tuteurs} />
              <ListeEleves eleves={eleves} />
            </div>
          </div>
        )}

        {activeTab === "ajout" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ajouter un tuteur */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Ajouter un tuteur
                  </h2>
                  <button
                    onClick={() =>
                      setShowFormulaireTuteur(!showFormulaireTuteur)
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    {showFormulaireTuteur ? "Annuler" : "Nouveau tuteur"}
                  </button>
                </div>
                {showFormulaireTuteur && (
                  <FormulaireTuteurComponent
                    onSubmit={handleAjouterTuteur}
                    onCancel={() => setShowFormulaireTuteur(false)}
                  />
                )}
              </div>

              {/* Ajouter un élève */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Ajouter un élève
                  </h2>
                  <button
                    onClick={() => setShowFormulaireEleve(!showFormulaireEleve)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    {showFormulaireEleve ? "Annuler" : "Nouvel élève"}
                  </button>
                </div>
                {showFormulaireEleve && (
                  <FormulaireEleveComponent
                    onSubmit={handleAjouterEleve}
                    onCancel={() => setShowFormulaireEleve(false)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
