"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("Sækir...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message ?? data.error ?? "Innskráning mistókst");
        return;
      }

      localStorage.setItem("token", data.token);
      setMessage("Innskráning tókst");
    } catch {
      setMessage("Villa kom upp við innskráningu");
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "450px" }}>
        <h1>Innskráning</h1>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
          <label>
            Notendanafn
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Lykilorð
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="button" type="submit">
            Skrá inn
          </button>
        </form>

        <p>{message}</p>
      </div>
    </div>
  );
}