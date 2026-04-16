"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("Sæki...");

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
        setMessage(data.error ?? "Innskráning mistókst");
        return;
      }

      localStorage.setItem("token", data.token);
      setMessage("Innskráning tókst");
    } catch {
      setMessage("Villa kom upp við innskráningu");
    }
  }

  return (
    <main>
      <h1>Innskráning</h1>

      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "400px",
          background: "#fff",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <label>
          Notendanafn
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </label>

        <label>
          Lykilorð
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </label>

        <button type="submit" style={{ padding: "0.75rem" }}>
          Skrá inn
        </button>

        <p>{message}</p>
      </form>
    </main>
  );
}