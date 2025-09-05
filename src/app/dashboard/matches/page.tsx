"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadMatchModal } from "@/components/upload/UploadMatchModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MatchesPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  return (
    <main className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Match History</h1>
        <Button onClick={() => setUploadOpen(true)}>Upload Match</Button>
      </div>
      <UploadMatchModal open={uploadOpen} onOpenChange={setUploadOpen} />
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Opponent</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="text-right">Turns</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>—</TableCell>
              <TableCell>—</TableCell>
              <TableCell>—</TableCell>
              <TableCell className="text-right">—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
