export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold">Welcome to GCG Coach</h1>
      <p className="max-w-xl text-center sm:text-left text-lg text-muted-foreground">
        Analyze your Gundam game match logs to improve your piloting skills.
        Upload logs, get insights, and track your progress over time.
      </p>
    </main>
  );
}
