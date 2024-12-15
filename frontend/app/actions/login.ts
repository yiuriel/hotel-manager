import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const response = await axios.post(`${process.env.API_URL}/auth/login`, {
      email,
      password,
    });

    const { access_token } = response.data;

    // Set JWT as an HttpOnly cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      })
    );

    res.status(200).json({ message: "Login successful" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data || "Error logging in" });
  }
}
