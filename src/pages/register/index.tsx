import { AxiosCaller } from "@/api-lib/axios-caller/AxiosCaller";
import { FC, useState } from "react";
import Link from "next/link";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const RegisterPage: FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const registerHandler = async () => {
    try {
      const res = await new AxiosCaller("http://localhost:3001").call["POST /register"]({
        body: { email, username, password },
      });

      alert("Register successful, please login");
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="bg-white p-6 rounded-xl border border-[#f8f8f8] shadow-2xl w-80 space-y-4">
        <h1 className="text-center text-xl font-bold">Register</h1>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerHandler();
          }}
          className="flex flex-col space-y-2 text-sm"
        >
          <div className="flex items-center border rounded px-3 py-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border rounded px-3 py-2">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
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
            Register
          </button>
        </form>

        <div className="text-xs text-center pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
