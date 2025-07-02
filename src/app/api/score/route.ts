import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId, score } = await request.json();

    if (!userId || score === undefined) {
      return NextResponse.json(
        { error: "UserId et score sont requis" },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Créer ou mettre à jour le score
    const userScore = await prisma.score.upsert({
      where: { userId },
      update: { score },
      create: {
        userId,
        score,
      },
    });

    return NextResponse.json({
      success: true,
      score: userScore.score,
      message: "Score sauvegardé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du score:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
