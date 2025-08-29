"use client";

// Sonner-based toast hook: thin, typed wrappers over `sonner` for a great DX.
import * as React from "react";
import { toast as sonnerToast } from "sonner";

// Useful inferred types from Sonner without importing internals
type SonnerToastOptions = Parameters<typeof sonnerToast>[1];
type PromiseLikeValue = Parameters<typeof sonnerToast.promise>[0];
type PromiseMessages = Parameters<typeof sonnerToast.promise>[1];

// Re-export the raw sonner toast for direct usage if desired
export { sonnerToast as toast };

function useToast() {
  // Base toast
  const toast = React.useCallback(
    (message: string | React.ReactNode, options?: SonnerToastOptions) =>
      sonnerToast(message, options),
    [],
  );

  // Common variants
  const success = React.useCallback(
    (message: string | React.ReactNode, options?: SonnerToastOptions) =>
      sonnerToast.success(message, options),
    [],
  );
  const error = React.useCallback(
    (message: string | React.ReactNode, options?: SonnerToastOptions) =>
      sonnerToast.error(message, options),
    [],
  );
  const info = React.useCallback(
    (message: string | React.ReactNode, options?: SonnerToastOptions) =>
      sonnerToast(message, { icon: "ℹ️", ...options }),
    [],
  );
  const warning = React.useCallback(
    (message: string | React.ReactNode, options?: SonnerToastOptions) =>
      sonnerToast(message, { icon: "⚠️", ...options }),
    [],
  );
  const loading = React.useCallback(
    (message: string | React.ReactNode, options?: SonnerToastOptions) =>
      sonnerToast.loading(message, options),
    [],
  );

  // Dismiss by id or all
  const dismiss = React.useCallback(
    (id?: string) => sonnerToast.dismiss(id),
    [],
  );

  // Update an existing toast by id: pass the same id to replace content/options
  const update = React.useCallback(
    (
      id: string,
      message: string | React.ReactNode,
      options?: SonnerToastOptions,
    ) => {
      sonnerToast(message, { ...options, id });
    },
    [],
  );

  // Promise helper passthrough
  const promise = React.useCallback(
    (
      p: PromiseLikeValue,
      messages: PromiseMessages,
    ) => sonnerToast.promise(p, messages),
    [],
  );

  const custom = React.useCallback(
    (
      renderer: Parameters<typeof sonnerToast.custom>[0],
      options?: Parameters<typeof sonnerToast.custom>[1],
    ) => sonnerToast.custom(renderer, options),
    [],
  );

  return {
    toast,
    success,
    error,
    info,
    warning,
    loading,
    dismiss,
    update,
    promise,
    custom,
  };
}

export { useToast };
