import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("set-cookie", [
    `wi_auth=; path=/; samesite=lax; httponly; expires=-1;`,
  ]);
  res.redirect("/login");
  return;
}
