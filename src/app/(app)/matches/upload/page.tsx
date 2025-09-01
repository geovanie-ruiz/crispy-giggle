import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UploadPage() {
  return (
    <main className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="size-5" /> Upload Match Log
          </CardTitle>
          <CardDescription>
            Paste a match log or upload a file to analyze.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <input
            type="file"
            accept=".txt,.log,.json"
            className="block w-full text-sm"
            aria-label="Upload match log file"
          />
          <div className="grid gap-2">
            <label htmlFor="paste" className="text-sm">
              Or paste log
            </label>
            <Textarea
              id="paste"
              rows={6}
              placeholder="Paste match log here..."
            />
          </div>
          <Button disabled>Process (stub)</Button>
        </CardContent>
      </Card>
    </main>
  );
}
