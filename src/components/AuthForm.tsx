"use client";

import { useState } from "react";
import Input from "./ui/Input/Input";
import Button from "./ui/Button/Button";

interface AuthFormProps {
  onRegister: (email: string, password: string) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function AuthForm({ onRegister, onLogin }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) await onLogin(email, password);
      else await onRegister(email, password);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <Input
          typeInput="email"
          data="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          typeInput="password"
          data="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col items-center">
          <Button
            type="submit"
            onClick={() => setIsLogin(!isLogin)}
            buttonText={isLogin ? "Login" : "Register"}
          />
          <div>
            {isLogin
              ? "Don't have an account yet?"
              : "Do you already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className=" text-gray-400 ml-4 text-sm   mt-2"
            >
              Switch to {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
