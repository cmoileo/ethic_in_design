import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Récupérer tous les scores avec les utilisateurs
    const scores = await prisma.score.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculer des statistiques
    const totalUsers = await prisma.user.count();
    const totalScores = scores.length;
    const averageScore =
      scores.length > 0
        ? Math.round(
            scores.reduce((sum, score) => sum + score.score, 0) / scores.length
          )
        : 0;
    const bestScore =
      scores.length > 0 ? Math.min(...scores.map((s) => s.score)) : 0;
    const worstScore =
      scores.length > 0 ? Math.max(...scores.map((s) => s.score)) : 0;

    // Récupérer les utilisateurs sans score (qui n'ont pas terminé)
    const usersWithoutScore = await prisma.user.findMany({
      where: {
        score: null,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        scores: scores.map((score) => ({
          id: score.id,
          userName: score.user.name,
          score: score.score,
          createdAt: score.createdAt.toISOString(),
          formattedTime: formatTime(score.score),
        })),
        statistics: {
          totalUsers,
          totalScores,
          averageScore,
          bestScore,
          worstScore,
          completionRate:
            totalUsers > 0 ? Math.round((totalScores / totalUsers) * 100) : 0,
        },
        usersWithoutScore: usersWithoutScore.map((user) => ({
          id: user.id,
          name: user.name,
        })),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des scores:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}
