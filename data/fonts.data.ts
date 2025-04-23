import { Dosis, Manrope } from "next/font/google";

export const dosis = Dosis({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dosis",
});

export const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const fonts = `${dosis.variable} ${manrope.variable}`;

export { fonts };
