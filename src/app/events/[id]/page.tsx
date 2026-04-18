import { notFound } from "next/navigation";

type Translation = {
  lang?: string;
  title?: string;
  text?: string;
  place?: string;
};

type Venue = {
  name?: string;
  city?: string;
  street?: string;
};

type EventType = {
  id: number;
  startsAt?: string;
  endsAt?: string;
  translations?: Translation[];
  venue?: Venue;
  images?: {
    original?: string | null;
    small?: string | null;
    medium?: string | null;
    large?: string | null;
    xlarge?: string | null;
    thumbnail?: string | null;
    banner?: string | null;
  }[];
};

async function getEvent(id: string): Promise<EventType | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Gat ekki sótt viðburð");
  }

  return res.json();
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const translation =
    event.translations?.find((t) => t.lang === "is") ?? event.translations?.[0];

  const image =
    event.images?.[0]?.large ||
    event.images?.[0]?.medium ||
    event.images?.[0]?.small ||
    event.images?.[0]?.original ||
    event.images?.[0]?.banner ||
    null;

  return (
    <div className="container">
      <article className="card" style={{ display: "grid", gap: "1rem" }}>
        <h1>{translation?.title ?? "Viðburður"}</h1>

        {image ? (
          <img
            src={image}
            alt={translation?.title ?? "Viðburðamynd"}
            style={{ borderRadius: "10px", maxHeight: "500px", objectFit: "cover", width: "100%" }}
          />
        ) : null}

        <p>{translation?.text ?? "Engin lýsing til staðar."}</p>

        <div>
          <p>
            <strong>Staður:</strong> {event.venue?.name ?? translation?.place ?? "Óþekktur staður"}
          </p>
          <p>
            <strong>Borg:</strong> {event.venue?.city ?? ""}
          </p>
          <p>
            <strong>Heimilisfang:</strong> {event.venue?.street ?? ""}
          </p>
          <p>
            <strong>Byrjar:</strong>{" "}
            {event.startsAt ? new Date(event.startsAt).toLocaleString("is-IS") : ""}
          </p>
          <p>
            <strong>Endar:</strong>{" "}
            {event.endsAt ? new Date(event.endsAt).toLocaleString("is-IS") : ""}
          </p>
        </div>
      </article>
    </div>
  );
}