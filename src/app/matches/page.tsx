import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MatchesPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Match History</h1>
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
