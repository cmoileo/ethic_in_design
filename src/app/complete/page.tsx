"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface GameResults {
  completedAt: string;
  totalSteps: number;
  timeSpent: number;
  patternsEncountered: string[];
}

export default function CompletePage() {
  const router = useRouter();
  const [results, setResults] = useState<GameResults | null>(null);
  const [showExplanations, setShowExplanations] = useState(false);
  const [userName, setUserName] = useState("");
  const [finalScore, setFinalScore] = useState(0);

  const darkPatterns = [
    {
      name: "Roach Motel",
      description: "Case pré-cochée pour newsletter difficile à décocher",
      impact: "Vous inscrit automatiquement à des communications non désirées",
    },
    {
      name: "Bait & Switch", 
      description: "Le bouton change de fonction au dernier moment",
      impact: "Vous fait faire une action différente de celle attendue",
    },
    {
      name: "Confirmshaming",
      description: "Options de refus formulées de manière humiliante",
      impact: "Utilise la culpabilité pour vous forcer à accepter",
    },
    {
      name: "Hidden Costs",
      description: "Frais cachés révélés au dernier moment",
      impact: "Vous fait payer plus que prévu sans consentement clair",
    },
    {
      name: "Forced Continuity",
      description: "Essai gratuit qui devient payant automatiquement",
      impact: "Prélèvements automatiques sans rappel explicite",
    },
    {
      name: "Privacy Zuckering",
      description: "Paramètres de confidentialité défavorables par défaut",
      impact: "Vos données personnelles sont partagées sans votre accord",
    },
    {
      name: "Misdirection",
      description: "Boutons trompeurs qui font l'inverse de ce qu'ils annoncent",
      impact: "Vous fait prendre des décisions contre vos intérêts",
    },
    {
      name: "Fake Urgency",
      description: "Fausse urgence avec compteurs factices",
      impact: "Vous pousse à prendre des décisions hâtives",
    },
    {
      name: "Difficult Cancellation",
      description: "Processus d'annulation volontairement complexe",
      impact: "Vous empêche de vous désabonner facilement",
    },
    {
      name: "Captcha Hell",
      description: "Captcha volontairement difficile et frustrant",
      impact: "Vous décourage d'accéder au service ou de vous désabonner",
    },
  ];

  useEffect(() => {
    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const name = urlParams.get('name');
    
    if (score) setFinalScore(parseInt(score));
    if (name) setUserName(decodeURIComponent(name));

    // Simuler des résultats de jeu
    const mockResults: GameResults = {
      completedAt: new Date().toISOString(),
      totalSteps: 10,
      timeSpent: score ? Math.round(parseInt(score) / 60 * 10) / 10 : 8.5, // convertir secondes en minutes
      patternsEncountered: darkPatterns.map(p => p.name),
    };
    setResults(mockResults);
  }, []);

  const handleRestart = () => {
    // Nettoyer le localStorage si nécessaire
    localStorage.removeItem('gameState');
    router.push('/register');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de félicitations */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Félicitations !
          </h1>
          <p className="text-xl text-gray-700">
            Vous avez terminé le parcours des dark patterns
          </p>
        </div>

        {/* Statistiques du jeu */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Vos résultats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{results.totalSteps}</div>
              <div className="text-gray-600">Étapes complétées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{results.timeSpent}</div>
              <div className="text-gray-600">Minutes passées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{results.patternsEncountered.length}</div>
              <div className="text-gray-600">Dark patterns rencontrés</div>
            </div>
          </div>
        </div>

        {/* Explication des dark patterns */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">🕵️ Dark Patterns Découverts</h2>
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showExplanations ? "Masquer" : "Voir"} les explications
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Durant votre parcours, vous avez rencontré {results.patternsEncountered.length} techniques 
            de manipulation différentes. Voici ce qu&apos;elles signifient :
          </p>

          {showExplanations && (
            <div className="space-y-4">
              {darkPatterns.map((pattern, index) => (
                <div 
                  key={pattern.name}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{pattern.name}</h3>
                      <p className="text-gray-600 mb-2">{pattern.description}</p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <p className="text-sm text-yellow-800">
                          <strong>Impact :</strong> {pattern.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message de sensibilisation */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">⚠️ Maintenant que vous savez...</h2>
          <div className="space-y-3 text-orange-800">
            <p>
              • <strong>Soyez vigilant</strong> : Ces techniques sont utilisées quotidiennement sur internet
            </p>
            <p>
              • <strong>Prenez votre temps</strong> : Ne vous laissez pas presser par de fausses urgences
            </p>
            <p>
              • <strong>Lisez attentivement</strong> : Vérifiez toujours les cases pré-cochées et les petits caractères
            </p>
            <p>
              • <strong>Questionnez-vous</strong> : Si quelque chose semble trop beau pour être vrai, c&apos;est probablement le cas
            </p>
            <p>
              • <strong>Partagez vos connaissances</strong> : Sensibilisez vos proches à ces pratiques
            </p>
          </div>
        </div>

        {/* Actions finales */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <button
              onClick={handleRestart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🔄 Refaire le parcours
            </button>
            <button
              onClick={handleGoHome}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              🏠 Retour à l&apos;accueil
            </button>
          </div>
          
          <div className="text-sm text-gray-500 mt-6">
            <p>Merci d&apos;avoir participé à cette démonstration éducative !</p>
            <p>Ensemble, construisons un web plus éthique 🌐💚</p>
          </div>
        </div>
      </div>
    </div>
  );
}
