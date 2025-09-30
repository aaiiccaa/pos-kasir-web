import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.redirect(`/login?error=username dan password wajib diisi`);
    }

    const api_response = await new AxiosCaller("http://localhost:3001").call["POST /login"]({
      body: {
        username: String(username),
        password: String(password),
      },
    });

    if (api_response) {
      const expire_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 
      const expires = expire_date.toUTCString();

      res.setHeader("Set-Cookie", [
        `wi_auth=${api_response.token}; Path=/; SameSite=Lax; HttpOnly; Expires=${expires}`,
      ]);
    }

    if (api_response) {
      return res.redirect("/dashboard");
    } else {
      return res.redirect("/login");
    }

  } catch (err: any) {
    console.error("Login error:", err?.response?.data || err.message);
        res.redirect(`/login?error=${err?.response?.data.toString()}`);

    return 
  }
}
