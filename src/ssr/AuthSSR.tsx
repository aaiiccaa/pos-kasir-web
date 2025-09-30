import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import { GetServerSidePropsContext } from "next";

export class ErrorSessionNotFound extends Error {
  public message: string = "Sesi pengguna tidak ditemukan";
}

export class ErrorProfileNotFound extends Error {
  public message: string = "Data pengguna tidak ditemukan";
}

export class ErrorNotOnboarding extends Error {
  public message: string = "Kamu belum onboarding";
}

export interface AuthSSRResult {
  authorization: string;
}

export async function AuthSSR(
  context: GetServerSidePropsContext
): Promise<AuthSSRResult> {
  const wi_auth = context.req.cookies.wi_auth as string;
  const authorization = wi_auth;

  if (!wi_auth) {
    throw new ErrorSessionNotFound();
  }

  let profile_data: any | null = null;
  try {
    profile_data = await new AxiosCaller("http://localhost:3001").call[
      "GET /users"
    ]({
      headers: {
        authorization: authorization,
      },
      query: { limit: 1, offset: 0 },
    });
  } catch {}

  if (profile_data === null) {
    throw new ErrorProfileNotFound();
  }

  return {
    authorization,
  };
}
