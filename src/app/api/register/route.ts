import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    // Créer l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      message: "Utilisateur créé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
