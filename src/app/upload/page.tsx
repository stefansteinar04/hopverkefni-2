"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [eventId, setEventId] = useState("");
  const [message, setMessage] = useState("");

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const nextFile = e.target.files?.[0] ?? null;
    setFile(nextFile);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!file) {
      setMessage("Veldu mynd fyrst.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Þú verður að vera innskráður.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("eventId", eventId);

    setMessage("Sendi mynd...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : "Upload mistókst";

        setMessage(errorMessage);
        return;
      }

      setMessage("Mynd var send inn.");
    } catch {
      setMessage("Villa kom upp við að senda mynd.");
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "500px" }}>
        <h1>Setja inn mynd</h1>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem" }}>
          <label>
            Event ID
            <input
              className="input"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="t.d. 1"
            />
          </label>

          <label>
            Veldu mynd
            <input
              className="input"
              type="file"
              accept="image/png,image/jpeg"
              onChange={onFileChange}
            />
          </label>

          <button className="button" type="submit">
            Hlaða upp mynd
          </button>
        </form>

        <p>{message}</p>
      </div>
    </div>
  );
}