type EventType = {
  id: number;
  translations?: { title: string }[];
  venue?: { name: string; city: string };
  startsAt?: string;
};

async function getEvents(): Promise<EventType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gat ekki sótt viðburði");
  }

  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main>
      <h1>Viðburðir</h1>

      {events.length === 0 ? (
        <p>Engir viðburðir fundust.</p>
      ) : (
        <ul style={{ display: "grid", gap: "1rem", padding: 0, listStyle: "none" }}>
          {events.map((event) => (
            <li
              key={event.id}
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <a href={`/events/${event.id}`}>
                <h2>{event.translations?.[0]?.title ?? `Viðburður ${event.id}`}</h2>
              </a>
              <p>{event.venue?.name ?? "Óþekktur staður"}</p>
              <p>{event.venue?.city ?? ""}</p>
              <p>{event.startsAt ?? ""}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}