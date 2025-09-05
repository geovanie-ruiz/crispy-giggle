"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadMatchForm } from "./UploadMatchForm";
import { useState } from "react";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function UploadMatchModal({ open, onOpenChange }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const actualOpen = isControlled ? open! : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  return (
    <Dialog open={actualOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[720px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Match</DialogTitle>
          <DialogDescription>
            Paste a Wing Table or Zumbo Sim log and add match metadata for Niven
            to analyze.
          </DialogDescription>
        </DialogHeader>
        <UploadMatchForm onSubmit={async () => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
