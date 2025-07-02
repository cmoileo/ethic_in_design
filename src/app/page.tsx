import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Jeu sur l'Éthique du Design
        </h1>
        <p className="text-gray-600 mb-6">
          Découvrez les "dark patterns" utilisés sur le web à travers une
          expérience interactive.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Cette application vous fera vivre 10 étapes avec différents patterns
          problématiques couramment utilisés dans les interfaces web.
        </p>
        <div className="space-y-4">
          <Link
            href="/register"
            className="inline-block w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Commencer l'expérience
          </Link>
        </div>
      </div>
    </div>
  );
}
