import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DawAI — Disease Forecast Dashboard",
  description:
    "An intelligent decision-support system that forecasts disease burden across Kenya's regions to help eliminate essential drug expiry and shortages in public hospitals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
