import { notFound } from "next/navigation";

interface Props {
  params: { id?: string };
}

export default function AnalysisDetailPage({ params }: Props) {
  const id = params?.id;
  if (!id) return notFound();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-2">Analysis #{id}</h1>
      <p className="text-sm text-muted-foreground">
        Charts, tabs, and insights will render here.
      </p>
    </main>
  );
}
