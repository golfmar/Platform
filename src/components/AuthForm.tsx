"use client";

import { useState } from "react";
import Input from "./ui/Input/Input";
import Button from "./ui/Button/Button";
import Image from "next/image";

interface AuthFormProps {
  onRegister: (email: string, password: string) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function AuthForm({ onRegister, onLogin }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [eye, setEye] = useState<boolean>(false);
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
        <div className="relative">
          <Input
            typeInput={`${eye ? "text" : "password"}`}
            data="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Image
            src="/assets/svg/eye.svg"
            alt="Logo"
            width={20}
            height={20}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100 cursor-pointer transition-all duration-200 ease-in-out"
            onClick={() => {
              setEye(!eye);
            }}
          />
        </div>
        <Button type="submit" buttonText={isLogin ? "Login" : "Register"} />
        <div className="text-center mt-2 text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline ml-1"
          >
            Switch to {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
