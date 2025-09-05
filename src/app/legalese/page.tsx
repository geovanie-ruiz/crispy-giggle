import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText } from "lucide-react";

export default function LegalesePage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Legal</h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s the quick summary. For full details, please read our
          Privacy Policy and Terms & Conditions.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="size-5 text-primary" /> Privacy at a glance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We collect only what&apos;s needed to coach your gameplay. You
              control your data and can delete it anytime.
            </p>
            <Button asChild variant="outline">
              <Link href="/legalese/privacy">Read Privacy Policy</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="size-5 text-primary" /> Terms, briefly
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use the app responsibly, respect others, and follow the rules. We
              provide insights—outcomes aren&apos;t guaranteed.
            </p>
            <Button asChild>
              <Link href="/legalese/terms">Read Terms & Conditions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
