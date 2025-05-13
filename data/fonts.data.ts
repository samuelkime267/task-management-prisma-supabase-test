import { Geist } from "next/font/google";

export const geist = Geist({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const fonts = `${geist.variable}`;

export { fonts };
