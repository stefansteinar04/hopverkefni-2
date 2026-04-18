import Link from "next/link";

type Translation = {
  lang?: string;
  title?: string;
  text?: string;
  place?: string;
};

type Venue = {
  name?: string;
  city?: string;
};

type EventType = {
  id: number;
  startsAt?: string;
  endsAt?: string;
  translations?: Translation[];
  venue?: Venue;
};

type EventsResponse = {
  items?: EventType[];
  page?: number;
  pages?: number;
  total?: number;
};

async function getEvents(): Promise<EventsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?page=1&limit=10`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gat ekki sótt viðburði");
  }

  return res.json();
}

export default async function EventsPage() {
  const data = await getEvents();
  const events = data.items ?? [];

  return (
    <div className="container">
      <h1>Viðburðir</h1>
      <p>
        Síða {data.page ?? 1} af {data.pages ?? 1} — samtals {data.total ?? events.length} viðburðir
      </p>

      {events.length === 0 ? (
        <div className="card">
          <p>Engir viðburðir fundust.</p>
        </div>
      ) : (
        <div className="card-grid">
          {events.map((event) => {
            const translation =
              event.translations?.find((t) => t.lang === "is") ?? event.translations?.[0];

            return (
              <article key={event.id} className="card">
                <h2>{translation?.title ?? `Viðburður ${event.id}`}</h2>
                <p>{translation?.place ?? event.venue?.name ?? "Óþekktur staður"}</p>
                <p>{event.venue?.city ?? ""}</p>
                <p>{event.startsAt ? new Date(event.startsAt).toLocaleString("is-IS") : ""}</p>

                <Link className="button" href={`/events/${event.id}`}>
                  Sjá nánar
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}