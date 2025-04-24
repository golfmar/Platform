"use client";

import { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{ marginLeft: "10px" }}
        >
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
