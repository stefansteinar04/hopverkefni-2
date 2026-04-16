import { notFound } from "next/navigation";

type EventType = {
  id: number;
  translations?: { lang: string; title: string; text: string; place: string }[];
  venue?: { name: string; city: string; street: string };
  startsAt?: string;
  endsAt?: string;
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

  const translation = event.translations?.find((t) => t.lang === "is") ?? event.translations?.[0];

  return (
    <main>
      <h1>{translation?.title ?? "Viðburður"}</h1>
      <p>{translation?.text ?? ""}</p>
      <p>Staður: {event.venue?.name ?? translation?.place ?? "Óþekktur staður"}</p>
      <p>Borg: {event.venue?.city ?? ""}</p>
      <p>Byrjar: {event.startsAt ?? ""}</p>
      <p>Endar: {event.endsAt ?? ""}</p>
    </main>
  );
}