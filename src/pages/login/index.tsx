import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const LoginPage: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const decodedError = decodeURIComponent(String(router.asPath));
    const cleanError = decodedError.includes(":")
      ? decodedError.split(":").slice(1).join(":").trim()
      : decodedError;

    if (cleanError != "/login") {
      setError(cleanError);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="bg-white p-6 rounded-xl border border-[#f8f8f8] shadow-2xl w-80 space-y-4">
        <h1 className="text-center text-xl font-bold">Login</h1>
        <form
          method="POST"
          action="/api/login"
          className="flex flex-col space-y-2 text-sm"
        >
          <div className="flex items-center border rounded px-3 py-2">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="w-full outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-xs text-red-500">{error}</div>

          <button
            type="submit"
            className="w-full bg-cyan-900 text-white py-2 rounded hover:bg-cyan-600 cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="text-xs text-center pt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
