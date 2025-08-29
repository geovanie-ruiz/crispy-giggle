import {
  Lora as FontSerif,
  Plus_Jakarta_Sans as FontSans,
  Roboto_Mono as FontMono,
} from "next/font/google";

export const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
