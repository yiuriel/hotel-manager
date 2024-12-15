import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    })
  );

  res.status(200).json({ message: "Logout successful" });
}
