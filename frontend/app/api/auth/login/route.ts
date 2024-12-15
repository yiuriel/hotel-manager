import axios from "axios";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const res = await req.json();
  console.log({ ...res });

  try {
    const response = await axios.post(`${process.env.API_URL}/auth/login`, {
      email: res.email,
      password: res.password,
    });

    const { access_token } = response.data;

    console.log({ access_token, response: response.data });

    return new Response("Login successful", {
      status: 200,
      headers: {
        "Set-Cookie": serialize("token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
        }),
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
