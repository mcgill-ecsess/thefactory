"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoginContext } from "@/Contexts/LoginContext";
import FactoryPageShell, { ShellPanel } from "@/components/FactoryPageShell";
import { Lock } from "lucide-react";

export default function Login() {
  const loginContext = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        loginContext?.setLoggedIn(true);
        router.push("/inventory");
      }
    }
  }, [loginContext?.isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://factorystrapi.mcgilleus.ca/api/auth/local", {
        identifier: username,
        password: password,
      });

      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      loginContext?.setLoggedIn(true);
      toast.success("Successfully Logged In!");
      router.push("/inventory");
    } catch (error) {
      setErrorMessage("Invalid login credentials.");
      console.error("Login failed:", error);
    }
  };

  return (
    <FactoryPageShell backdrop className="flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-6 py-20">
        <ShellPanel className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-factory-green/15 text-factory-green mb-4">
              <Lock size={22} />
            </div>
            <span className="text-factory-green text-xs font-semibold uppercase tracking-[0.22em] mb-2">
              Managers Only
            </span>
            <h1 className="text-3xl font-bold text-white text-center">Sign In</h1>
            <p className="text-white/40 text-sm mt-2 text-center">
              Access is restricted to Factory Managers.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs uppercase tracking-widest font-semibold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-factory-green/60 transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs uppercase tracking-widest font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-factory-green/60 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {errorMessage && (
              <p className="text-red-400 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="mt-2 bg-factory-green hover:bg-factory-dark-green text-white font-bold py-3 rounded-xl transition-colors tracking-wide uppercase text-sm"
            >
              Login
            </button>
          </form>
        </ShellPanel>
      </div>
    </FactoryPageShell>
  );
}
