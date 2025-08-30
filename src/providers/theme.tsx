"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function ThemeProvider({ children, themeProps }: ProvidersProps) {
  return <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>;
}
