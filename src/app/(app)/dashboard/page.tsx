import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <p className="text-sm text-muted-foreground">
            Overview content coming soon.
          </p>
        </TabsContent>
        <TabsContent value="insights" className="mt-4">
          <p className="text-sm text-muted-foreground">
            Insights content coming soon.
          </p>
        </TabsContent>
      </Tabs>
    </main>
  );
}
