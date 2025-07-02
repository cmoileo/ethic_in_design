"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const scoreParam = searchParams.get("score");
    const nameParam = searchParams.get("name");

    if (scoreParam) {
      setScore(parseInt(scoreParam));
    }
    if (nameParam) {
      setUserName(decodeURIComponent(nameParam));
    }
  }, [searchParams]);

  const getScoreComment = (timeInSeconds: number) => {
    if (timeInSeconds < 180)
      return {
        emoji: "🚀",
        text: "Incroyable ! Vous êtes très rapide",
        color: "text-green-600",
      };
    if (timeInSeconds < 300)
      return { emoji: "⚡", text: "Excellent temps !", color: "text-blue-600" };
    if (timeInSeconds < 420)
      return { emoji: "👍", text: "Bon temps", color: "text-yellow-600" };
    if (timeInSeconds < 600)
      return {
        emoji: "🤔",
        text: "Les dark patterns vous ont ralenti",
        color: "text-orange-600",
      };
    return {
      emoji: "😅",
      text: "Les dark patterns ont bien fonctionné !",
      color: "text-red-600",
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (score === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Chargement de vos résultats...</p>
        </div>
      </div>
    );
  }

  const scoreComment = getScoreComment(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Félicitations {userName} !
          </h1>

          <div className="mb-6">
            <div className="text-6xl mb-4">{scoreComment.emoji}</div>
            <h2 className="text-2xl font-semibold mb-2">Votre score :</h2>
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {formatTime(score)}
            </div>
            <p className={`text-lg ${scoreComment.color} font-medium`}>
              {scoreComment.text}
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">
              🧠 Ce que vous avez appris
            </h3>
            <p className="text-yellow-700 mb-4">
              Vous venez d'expérimenter 10 dark patterns couramment utilisés sur
              le web. Ces techniques sont conçues pour manipuler les
              utilisateurs et leur faire perdre du temps ou de l'argent.
            </p>
            <div className="text-left space-y-2 text-sm text-yellow-600">
              <p>
                • <strong>Roach Motel</strong> : Facile d'entrer, difficile de
                sortir
              </p>
              <p>
                • <strong>Bait & Switch</strong> : Le bouton change de fonction
              </p>
              <p>
                • <strong>Confirmshaming</strong> : Culpabilisation des choix
              </p>
              <p>
                • <strong>Hidden Costs</strong> : Frais cachés révélés tard
              </p>
              <p>
                • <strong>Et 6 autres patterns manipulateurs...</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              ✅ Bonnes pratiques à retenir
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Toujours lire les conditions avant de cocher</li>
              <li>• Méfiance des offres "trop belles pour être vraies"</li>
              <li>• Vérifier les frais cachés avant validation</li>
              <li>• Prendre son temps pour les décisions importantes</li>
              <li>• Identifier les boutons trompeurs</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-red-800">
              ⚠️ Signaux d'alarme
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Cases pré-cochées suspectes</li>
              <li>• Urgence artificielle (compteurs, stock limité)</li>
              <li>• Processus d'annulation complexe</li>
              <li>• Options de refus culpabilisantes</li>
              <li>• Demande de CB pour un "gratuit"</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">
            🎯 Partagez votre expérience
          </h3>
          <p className="text-gray-600 mb-6">
            Maintenant que vous connaissez ces techniques, vous pouvez mieux les
            éviter et sensibiliser votre entourage !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                navigator
                  .share?.({
                    title: "Jeu sur l'éthique du design",
                    text: `J'ai terminé le jeu sur les dark patterns en ${formatTime(score)} ! Testez vos connaissances sur l'éthique du design.`,
                    url: window.location.origin,
                  })
                  .catch(() => {
                    // Fallback si Web Share API n'est pas supportée
                    navigator.clipboard.writeText(
                      `J'ai terminé le jeu sur les dark patterns en ${formatTime(score)} ! ${window.location.origin}`
                    );
                    alert("Lien copié dans le presse-papiers !");
                  });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              📱 Partager mon score
            </button>

            <Link
              href="/dashboard"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors inline-block"
            >
              📊 Voir tous les résultats
            </Link>

            <Link
              href="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors inline-block"
            >
              🔄 Recommencer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
