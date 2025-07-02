"use client";

import { useState, useEffect } from "react";

interface FormData {
  [key: string]: string | boolean | undefined;
  email?: string;
  phone?: string;
  address?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  birthDate?: string;
  profession?: string;
  familyStatus?: string;
  cancellationReason?: string;
  confirmationPhone?: string;
  confirmationCode?: string;
  captchaAnswer?: string;
  newsletter?: boolean;
  offers?: string;
  misdirection?: string;
  cancellationCompleted?: boolean;
  captchaCompleted?: boolean;
}

type SetFormData = React.Dispatch<React.SetStateAction<FormData>>;

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gestion de la soumission du formulaire de création de compte
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) {
      setError("Veuillez entrer votre nom");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId);
        setGameStarted(true);
        setStartTime(Date.now());
      } else {
        setError(data.error || "Erreur lors de la création du compte");
      }
    } catch (err) {
      setError("Erreur de connexion");
      console.error("Erreur de connexion:", err);
    } finally {
      setLoading(false);
    }
  };

  // Si le jeu n'a pas commencé, afficher le formulaire de création de compte
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Créer votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Commencez votre expérience sur l&apos;éthique du design
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="sr-only">
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Votre nom"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? "Création..." : "Créer mon compte"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Une fois le jeu commencé, afficher les étapes du formulaire avec dark patterns
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bienvenue {userName} !
            </h1>
            <p className="text-gray-600">
              Maintenant, veuillez compléter votre inscription...
            </p>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
              {" "}
              <p className="text-sm text-blue-800">
                🎮 <strong>Jeu sur l&apos;éthique du design</strong> - Vous
                allez expérimenter différents &quot;dark patterns&quot;
                couramment utilisés sur le web. Essayez de les identifier !
              </p>
            </div>
          </div>

          {/* Indicateur de progression */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Étape {currentStep + 1} sur 10</span>
              <span>
                Temps écoulé:{" "}
                {startTime ? Math.floor((Date.now() - startTime) / 1000) : 0}s
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Contenu de l'étape actuelle */}
          <div className="space-y-6">
            <GameStepComponent
              step={currentStep}
              onNext={() => setCurrentStep((prev) => Math.min(prev + 1, 9))}
              userId={userId}
              startTime={startTime}
              userName={userName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant pour gérer les différentes étapes du jeu
function GameStepComponent({
  step,
  onNext,
  userId,
  startTime,
  userName,
}: {
  step: number;
  onNext: () => void;
  userId: string | null;
  startTime: number | null;
  userName: string;
}) {
  const [formData, setFormData] = useState<FormData>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pour l'instant, on passe juste à l'étape suivante
    // Plus tard, on ajoutera la logique pour sauvegarder le score final
    if (step === 9) {
      // Dernière étape - sauvegarder le score
      if (userId && startTime) {
        const finalScore = Math.floor((Date.now() - startTime) / 1000);
        await saveScore(userId, finalScore, userName);
      }
    } else {
      onNext();
    }
  };

  const saveScore = async (userId: string, score: number, userName: string) => {
    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, score }),
      });

      if (response.ok) {
        // Rediriger vers la page de résultats
        window.location.href = `/results?score=${score}&name=${encodeURIComponent(userName)}`;
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du score:", error);
      alert(`Score final: ${score} secondes`);
    }
  };

  // Pour l'instant, on affiche une étape simple
  // Nous développerons les dark patterns spécifiques dans les prochaines itérations
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Étape {step + 1}: Informations {getStepTitle(step)}
        </h3>

        {renderStepContent(step, formData, setFormData)}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {step === 9 ? "Terminer" : "Suivant"}
        </button>
      </div>
    </form>
  );
}

function getStepTitle(step: number): string {
  const titles = [
    "Newsletter (Roach Motel)",
    "Confirmation (Bait & Switch)",
    "Préférences (Confirmshaming)",
    "Facturation (Hidden Costs)",
    "Premium (Forced Continuity)",
    "Confidentialité (Privacy Zuckering)",
    "Navigation (Misdirection)",
    "Urgence (Fake Urgency)",
    "Annulation (Difficult Cancellation)",
    "Sécurité (Captcha Hell)",
  ];
  return titles[step] || "supplémentaires";
}

function renderStepContent(
  step: number,
  formData: FormData,
  setFormData: SetFormData
) {
  switch (step) {
    case 0: // Roach Motel - Newsletter piège
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">
              🎉 Offres Exclusives !
            </h4>
            <div className="space-y-2">
              <label className="flex items-start space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.newsletter !== false}
                  onChange={(e) =>
                    setFormData({ ...formData, newsletter: e.target.checked })
                  }
                  className="mt-0.5"
                />
                <span>
                  <strong>Oui</strong>, je veux recevoir des offres exclusives,
                  des promotions et des nouvelles de nos partenaires commerciaux
                </span>
              </label>
              <p className="text-xs text-gray-500 ml-6">
                * Pour vous désinscrire, envoyez un courrier recommandé avec
                accusé de réception à notre siège social avec une pièce
                d&apos;identité
              </p>
            </div>
          </div>
        </div>
      );

    case 1: // Bait and Switch - Bouton qui change
      return (
        <BaitAndSwitchStep formData={formData} setFormData={setFormData} />
      );

    case 2: // Confirmshaming - Honte de confirmation
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-800 mb-3">
              💰 Économisez jusqu&apos;à 50% !
            </h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="offers"
                  value="yes"
                  checked={formData.offers === "yes"}
                  onChange={(e) =>
                    setFormData({ ...formData, offers: e.target.value })
                  }
                />
                <span className="text-green-700 font-medium">
                  ✅ Oui, je veux économiser de l&apos;argent avec vos offres
                  spéciales !
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="offers"
                  value="no"
                  checked={formData.offers === "no"}
                  onChange={(e) =>
                    setFormData({ ...formData, offers: e.target.value })
                  }
                />
                <span className="text-red-600 text-sm">
                  ❌ Non, je préfère payer le prix fort et rater des bonnes
                  affaires
                </span>
              </label>
            </div>
          </div>
        </div>
      );

    case 3: // Hidden Costs - Coûts cachés
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-md p-4">
            <h4 className="font-medium mb-3">
              📦 Récapitulatif de votre commande
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Service gratuit</span>
                <span className="font-medium">0,00 €</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Frais de traitement</span>
                <span>4,99 €</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Assurance protection</span>
                <span>2,50 €</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Frais de dossier</span>
                <span>1,99 €</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>9,48 €</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 4: // Forced Continuity - Continuité forcée
      return (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <h4 className="font-medium text-yellow-800 mb-2">
              🎁 Essai GRATUIT de 7 jours !
            </h4>
            <p className="text-sm text-yellow-700">
              Profitez de toutes nos fonctionnalités premium gratuitement
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de carte bancaire *
            </label>
            <input
              type="text"
              required
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.cardNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              * Aucun débit durant l&apos;essai. Après 7 jours : 29,99€/mois
              (annulation possible dans votre espace client)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MM/AA
              </label>
              <input
                type="text"
                required
                placeholder="12/25"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.expiry || ""}
                onChange={(e) =>
                  setFormData({ ...formData, expiry: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                required
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.cvv || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      );

    case 5: // Privacy Zuckering - Piège à données
      return (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800 mb-3">
            🔒 Paramètres de confidentialité
          </h4>
          <div className="space-y-3 text-sm">
            {[
              {
                key: "shareEmail",
                label: "Partager mon email avec nos partenaires commerciaux",
              },
              {
                key: "shareLocation",
                label: "Partager ma localisation pour des offres géolocalisées",
              },
              {
                key: "shareActivity",
                label: "Partager mon activité pour améliorer l&apos;expérience",
              },
              {
                key: "shareContacts",
                label: "Analyser mes contacts pour me suggérer des amis",
              },
              {
                key: "shareUsage",
                label: "Partager mes données d'usage à des fins statistiques",
              },
              {
                key: "acceptCookies",
                label: "Accepter tous les cookies (recommandé)",
              },
            ].map((item) => (
              <label key={item.key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData[item.key] !== false}
                  onChange={(e) =>
                    setFormData({ ...formData, [item.key]: e.target.checked })
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            En continuant, vous acceptez notre politique de confidentialité de
            47 pages.
          </p>
        </div>
      );

    case 6: // Misdirection - Détournement d'attention
      return <MisdirectionStep formData={formData} setFormData={setFormData} />;

    case 7: // Fake Urgency - Fausse urgence
      return <FakeUrgencyStep formData={formData} setFormData={setFormData} />;

    case 8: // Difficult Cancellation - Annulation difficile
      return (
        <DifficultCancellationStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 9: // Captcha Hell - Enfer du captcha
      return <CaptchaHellStep formData={formData} setFormData={setFormData} />;

    default:
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Champ {step + 1}
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={(formData[`field${step}`] as string) || ""}
              onChange={(e) =>
                setFormData({ ...formData, [`field${step}`]: e.target.value })
              }
            />
          </div>
        </div>
      );
  }
}

// Composants pour les Dark Patterns complexes

function BaitAndSwitchStep({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: SetFormData;
}) {
  const [buttonText, setButtonText] = useState("Continuer gratuitement");
  const [switched, setSwitched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText("S'abonner au Premium (19,99€/mois)");
      setSwitched(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date de naissance
        </label>
        <input
          type="date"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.birthDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, birthDate: e.target.value })
          }
        />
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-md">
        <h4 className="font-medium text-purple-800 mb-2">
          ⭐ Offre spéciale !
        </h4>
        <p className="text-sm text-purple-700 mb-3">
          Le bouton va changer dans quelques secondes...
        </p>
        <div
          className={`text-center transition-all duration-500 ${switched ? "bg-orange-100 border border-orange-300 rounded p-2" : ""}`}
        >
          <span
            className={`text-sm font-medium ${switched ? "text-orange-800" : "text-green-700"}`}
          >
            {buttonText}
          </span>
        </div>
      </div>
    </div>
  );
}

function MisdirectionStep({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: SetFormData;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profession
        </label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.profession || ""}
          onChange={(e) =>
            setFormData({ ...formData, profession: e.target.value })
          }
        />
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
        <h4 className="font-medium text-red-800 mb-3">
          ⚠️ Attention ! Quel bouton choisir ?
        </h4>
        <p className="text-sm text-red-700 mb-4">
          Lisez bien avant de cliquer !
        </p>
        <div className="flex space-x-4">
          <button
            type="button"
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
            onClick={() => setFormData({ ...formData, misdirection: "cancel" })}
          >
            Annuler l&apos;inscription
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-400 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-500 text-sm"
            onClick={() =>
              setFormData({ ...formData, misdirection: "continue" })
            }
          >
            Continuer
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Le bouton vert fait le contraire de ce qu&apos;il annonce
        </p>
      </div>
    </div>
  );
}

function FakeUrgencyStep({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: SetFormData;
}) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [spotsLeft, setSpotsLeft] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Redémarre le timer
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    const spotsTimer = setInterval(() => {
      setSpotsLeft(() => Math.max(1, Math.floor(Math.random() * 5) + 1));
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(spotsTimer);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-4">
      <div className="bg-red-100 border border-red-300 rounded-md p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-red-800">🔥 OFFRE LIMITÉE !</h4>
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>
        <p className="text-red-700 text-sm mb-2">
          ⏰ Plus que <strong>{spotsLeft} places</strong> disponibles !
        </p>
        <p className="text-xs text-red-600">
          Cette offre expire dans {minutes} minutes et {seconds} secondes
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Situation familiale
        </label>
        <select
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.familyStatus || ""}
          onChange={(e) =>
            setFormData({ ...formData, familyStatus: e.target.value })
          }
        >
          <option value="">Sélectionnez...</option>
          <option value="single">Célibataire</option>
          <option value="married">Marié(e)</option>
          <option value="divorced">Divorcé(e)</option>
          <option value="widowed">Veuf/Veuve</option>
        </select>
      </div>
    </div>
  );
}

function DifficultCancellationStep({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: SetFormData;
}) {
  const [attempts, setAttempts] = useState(0);
  const [showError, setShowError] = useState(false);

  const handleReasonSubmit = () => {
    setAttempts((prev) => prev + 1);
    if (attempts < 2) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } else {
      setFormData({ ...formData, cancellationCompleted: true });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h4 className="font-medium text-yellow-800 mb-2">
          😔 Vous souhaitez vraiment partir ?
        </h4>
        <p className="text-sm text-yellow-700 mb-3">
          Nous sommes tristes de vous voir partir. Pouvez-vous nous dire
          pourquoi ?
        </p>

        <div className="space-y-2 mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Raison de l&apos;annulation *
          </label>
          <textarea
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Minimum 50 caractères requis..."
            value={formData.cancellationReason || ""}
            onChange={(e) =>
              setFormData({ ...formData, cancellationReason: e.target.value })
            }
          />
        </div>

        <div className="space-y-2 mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Numéro de téléphone (pour confirmation) *
          </label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.confirmationPhone || ""}
            onChange={(e) =>
              setFormData({ ...formData, confirmationPhone: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">
            Notre équipe vous contactera sous 48h pour finaliser
            l&apos;annulation
          </p>
        </div>

        {showError && (
          <div className="bg-red-100 border border-red-300 rounded p-2 mb-4">
            <p className="text-red-700 text-sm">
              ❌ Erreur:{" "}
              {attempts === 1 ? "Raison insuffisante" : "Numéro invalide"}.
              Veuillez réessayer.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleReasonSubmit}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-sm"
          disabled={!formData.cancellationReason || !formData.confirmationPhone}
        >
          Confirmer l&apos;annulation ({attempts + 1}/3)
        </button>
      </div>
    </div>
  );
}

function CaptchaHellStep({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: SetFormData;
}) {
  const [captchaAttempts, setCaptchaAttempts] = useState(0);
  const [currentCaptcha, setCurrentCaptcha] = useState(0);
  const [showError, setShowError] = useState(false);

  const captchas = [
    {
      question: "Sélectionnez tous les feux de circulation",
      answer: "traffic",
      difficulty: "floue",
    },
    {
      question: "Tapez les caractères que vous voyez",
      answer: "8X9K2",
      difficulty: "déformés",
    },
    { question: "Combien font 15 + 27 ?", answer: "42", difficulty: "math" },
  ];

  const handleCaptchaSubmit = () => {
    setCaptchaAttempts((prev) => prev + 1);

    if (captchaAttempts < 3) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setCurrentCaptcha((prev) => (prev + 1) % captchas.length);
      }, 2000);
    } else {
      setFormData({ ...formData, captchaCompleted: true });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Code de confirmation (reçu par email)
        </label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.confirmationCode || ""}
          onChange={(e) =>
            setFormData({ ...formData, confirmationCode: e.target.value })
          }
        />
      </div>

      <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
        <h4 className="font-medium text-gray-800 mb-3">
          🤖 Vérification anti-robot
        </h4>

        <div className="bg-white border-2 border-gray-400 rounded p-4 mb-4">
          <p className="text-sm font-medium mb-2">
            {captchas[currentCaptcha].question}
          </p>

          <div className="bg-gray-200 border border-gray-400 rounded p-4 mb-3 text-center">
            {currentCaptcha === 0 && (
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-300 h-16 rounded flex items-center justify-center text-xs"
                  >
                    {i % 3 === 0 ? "🚦" : i % 4 === 0 ? "🚗" : "🏢"}
                  </div>
                ))}
              </div>
            )}
            {currentCaptcha === 1 && (
              <div className="font-mono text-2xl transform rotate-12 skew-x-12 text-gray-600 filter blur-sm">
                8X9K2
              </div>
            )}
            {currentCaptcha === 2 && (
              <div className="text-lg font-medium">15 + 27 = ?</div>
            )}
          </div>

          <input
            type="text"
            placeholder="Votre réponse..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
            value={formData.captchaAnswer || ""}
            onChange={(e) =>
              setFormData({ ...formData, captchaAnswer: e.target.value })
            }
          />

          {showError && (
            <div className="bg-red-100 border border-red-300 rounded p-2 mb-3">
              <p className="text-red-700 text-sm">
                ❌ Réponse incorrecte. Tentative {captchaAttempts}/4
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => handleCaptchaSubmit()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
            disabled={!formData.captchaAnswer}
          >
            Vérifier
          </button>
        </div>
      </div>
    </div>
  );
}
