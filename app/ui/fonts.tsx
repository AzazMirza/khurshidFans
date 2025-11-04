import { GoogleFont } from "next/font/google";

export const lusitana = GoogleFont({
  name: "Lusitana",
  weights: [300, 400, 500, 600, 700],
  subsets: ["latin"],
});

export const fontLusitana300 = `${lusitana.style} font-weight: 300;`;
export const fontLusitana400 = `${lusitana.style} font-weight: 400;`;
export const fontLusitana500 = `${lusitana.style} font-weight: 500;`;
export const fontLusitana600 = `${lusitana.style} font-weight: 600;`;
export const fontLusitana700 = `${lusitana.style} font-weight: 700;`;

