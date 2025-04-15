import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return res.status(200).json({ modrator: user?.modrator || false });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
