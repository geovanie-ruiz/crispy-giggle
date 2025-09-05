"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  detectTranscriptSource,
  TranscriptSource,
} from "@/lib/transcripts/detect";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onSubmit?: (payload: {
    transcript: string;
    source: TranscriptSource;
    opponentArchetype: string;
    deckUsed: string;
    date: Date | undefined;
  }) => void | Promise<void>;
  isSubmitting?: boolean;
};

export function UploadMatchForm({ onSubmit, isSubmitting }: Props) {
  const [transcript, setTranscript] = useState("");
  const [opponentArchetype, setOpponentArchetype] = useState("");
  const [deckUsed, setDeckUsed] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  // Uncontrolled popover per shadcn date-picker demo to avoid focus/blur close issues.

  const source = useMemo<TranscriptSource>(
    () => detectTranscriptSource(transcript),
    [transcript]
  );

  // Stubbed decks: in production, pass user's decks via props and hydrate this Select.
  const defaultDeckOptions: { id: string; name: string }[] = [
    { id: "deck-1", name: "Barbatos Aggro" },
    { id: "deck-2", name: "Zeon Control" },
    { id: "deck-3", name: "Colony Swarm" },
    { id: "deck-4", name: "Destiny Midrange" },
  ];

  const dateLabel = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "Select a date";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit?.({
      transcript,
      source,
      opponentArchetype,
      deckUsed,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Match metadata first */}
      <Card className="border-dashed">
        <CardContent className="grid grid-flow-row grid-cols-3 gap-2 justify-items-stretch">
          {/* Deck select */}
          <div>
            <Label htmlFor="deckUsed">Deck used</Label>
            <Select value={deckUsed} onValueChange={setDeckUsed}>
              <SelectTrigger id="deckUsed" aria-label="Select deck used">
                <SelectValue placeholder="Select a deck" />
              </SelectTrigger>
              <SelectContent>
                {defaultDeckOptions.map((d) => (
                  <SelectItem key={d.id} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Opponent archetype with autocomplete suggestions */}
          <div>
            <Label htmlFor="opponentArchetype">Opponent archetype</Label>
            <Input
              id="opponentArchetype"
              placeholder="Start typing…"
              value={opponentArchetype}
              onChange={(e) => setOpponentArchetype(e.target.value)}
              list="opponent-archetypes"
              autoComplete="off"
            />
          </div>

          {/* Date as input with calendar popover */}
          <div>
            <Label htmlFor="match-date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="match-date"
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  aria-label="Select date"
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {date ? dateLabel : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  autoFocus
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Log paste field */}
      <div className="grid gap-2">
        <Label htmlFor="paste">Paste match log</Label>
        <Textarea
          id="paste"
          rows={10}
          placeholder="Paste match log here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="min-h-32 max-h-[40vh] overflow-auto resize-y"
        />
        <p className="text-xs text-muted-foreground">
          Detected source: <span className="font-medium">{source}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Paste a Wing Table or Zumbo Sim log. Free-form notes parsing is
          planned.
        </p>
      </div>

      {/* Hidden datalist providing A–Z suggestions */}
      <datalist id="opponent-archetypes">
        <option value="Aggro Alpha" />
        <option value="Blitz Beatdown" />
        <option value="Control Colony" />
        <option value="Destiny Midrange" />
        <option value="Energy Ramp" />
        <option value="Fusion Combo" />
        <option value="Gundam Go-Wide" />
        <option value="Hardened Shields" />
        <option value="I-Field Control" />
        <option value="Junkyard Recursion" />
        <option value="Kai Tempo" />
        <option value="Lancer Aggro" />
        <option value="Mecha Midrange" />
        <option value="Nova Burn" />
        <option value="Orbital Control" />
        <option value="Plasma Tempo" />
        <option value="Quantum Combo" />
        <option value="Rampart Walls" />
        <option value="Siege Assault" />
        <option value="Turret Control" />
        <option value="Unit Swarm" />
        <option value="Vanguard Aggro" />
        <option value="Wildfire Burn" />
        <option value="Xeno Toolbox" />
        <option value="Yield Control" />
        <option value="Zenith Midrange" />
      </datalist>

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setTranscript("");
            setOpponentArchetype("");
            setDeckUsed("");
            setDate(undefined);
          }}
        >
          Reset
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <PlusCircle className="size-4 mr-2" />{" "}
          {isSubmitting ? "Adding…" : "Add Match"}
        </Button>
      </div>
    </form>
  );
}
