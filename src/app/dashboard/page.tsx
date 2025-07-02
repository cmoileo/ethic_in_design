"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Score {
  id: string;
  userName: string;
  score: number;
  createdAt: string;
  formattedTime: string;
}

interface Statistics {
  totalUsers: number;
  totalScores: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  completionRate: number;
}

interface UserWithoutScore {
  id: string;
  name: string;
}

interface ResultsData {
  scores: Score[];
  statistics: Statistics;
  usersWithoutScore: UserWithoutScore[];
}

export default function DashboardPage() {
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    try {
      const response = await fetch("/api/scores", {
        cache: "no-store",
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
        setLastUpdate(new Date());
        setError(null);
      } else {
        setError("Erreur lors du chargement des données");
      }
    } catch (error) {
      setError("Erreur de connexion");
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Charger les données immédiatement
    fetchResults();

    // Configurer le polling toutes les secondes
    const interval = setInterval(fetchResults, 1000);

    // Nettoyer l'interval au démontage du composant
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  const getScoreColor = (score: number) => {
    if (score < 180) return "text-green-600 bg-green-50";
    if (score < 300) return "text-blue-600 bg-blue-50";
    if (score < 420) return "text-yellow-600 bg-yellow-50";
    if (score < 600) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreEmoji = (score: number) => {
    if (score < 180) return "🚀";
    if (score < 300) return "⚡";
    if (score < 420) return "👍";
    if (score < 600) return "🤔";
    return "😅";
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌ {error}</div>
          <button
            onClick={fetchResults}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📊 Tableau de Bord - Jeu Éthique Design
              </h1>
              <p className="text-gray-600 mt-2">
                Résultats en temps réel • Mise à jour toutes les secondes
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live • Actualisation auto</span>
                </div>
                {data && (
                  <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {data.usersWithoutScore.length} en jeu maintenant
                  </div>
                )}
              </div>
              {lastUpdate && (
                <p className="text-xs text-gray-400 mt-1">
                  Dernière mise à jour: {lastUpdate.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {data && (
          <>
            {/* Barre d'activité récente */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📈 Activité récente
                </h3>
                <div className="space-y-2">
                  {data.scores.slice(0, 3).map((score) => (
                    <div
                      key={score.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">
                          {getScoreEmoji(score.score)}
                        </span>
                        <div>
                          <span className="font-medium text-gray-900">
                            {score.userName}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            a terminé en {score.formattedTime}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(score.createdAt).toLocaleTimeString("fr-FR")}
                      </span>
                    </div>
                  ))}
                  {data.scores.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Aucune activité récente
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Participants
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {data.statistics.totalUsers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                      <span className="text-green-600 font-semibold">✅</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Terminé</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {data.statistics.totalScores}
                      <span className="text-sm text-gray-500 ml-1">
                        ({data.statistics.completionRate}%)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                      <span className="text-yellow-600 font-semibold">⏱️</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Temps moyen
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {formatTime(data.statistics.averageScore)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">🏆</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Meilleur temps
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {data.statistics.bestScore > 0
                        ? formatTime(data.statistics.bestScore)
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tableau des scores */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      🏁 Classement des participants
                    </h3>
                  </div>
                  <div className="overflow-hidden">
                    {data.scores.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rang
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Participant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Temps
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Terminé le
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[...data.scores]
                            .sort((a, b) => a.score - b.score)
                            .map((score, index) => (
                              <tr key={score.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className="text-2xl mr-2">
                                      {index === 0
                                        ? "🥇"
                                        : index === 1
                                          ? "🥈"
                                          : index === 2
                                            ? "🥉"
                                            : `#${index + 1}`}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className="text-lg mr-2">
                                      {getScoreEmoji(score.score)}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                      {score.userName}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${getScoreColor(score.score)}`}
                                  >
                                    {score.formattedTime}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(score.createdAt).toLocaleString(
                                    "fr-FR"
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">
                          Aucun score enregistré pour le moment
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar avec participants en cours */}
              <div className="space-y-6">
                {/* Participants en cours */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      ⏳ En cours de jeu
                    </h3>
                  </div>
                  <div className="p-6">
                    {data.usersWithoutScore.length > 0 ? (
                      <div className="space-y-3">
                        {data.usersWithoutScore.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-3 bg-yellow-50 rounded-md"
                          >
                            <span className="font-medium text-gray-900">
                              {user.name}
                            </span>
                            <div className="flex items-center text-yellow-600">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2"></div>
                              <span className="text-sm">En jeu</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center">
                        Aucun participant en cours
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    🎮 Actions
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/"
                      className="block w-full bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Nouveau participant
                    </Link>
                    <button
                      onClick={() => window.location.reload()}
                      className="block w-full bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Actualiser manuellement
                    </button>
                  </div>
                </div>

                {/* Légende des scores */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📈 Légende des scores
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 rounded mr-2"></span>
                      <span className="text-green-600">
                        🚀 Excellent (&lt; 3min)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-blue-100 rounded mr-2"></span>
                      <span className="text-blue-600">
                        ⚡ Très bien (&lt; 5min)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-yellow-100 rounded mr-2"></span>
                      <span className="text-yellow-600">
                        👍 Bien (&lt; 7min)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-orange-100 rounded mr-2"></span>
                      <span className="text-orange-600">
                        🤔 Moyen (&lt; 10min)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-red-100 rounded mr-2"></span>
                      <span className="text-red-600">😅 Lent (&gt; 10min)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
