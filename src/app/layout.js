import { Inter } from "next/font/google";
import "./globals.css";
import { initCronJobs } from "@/lib/cron/init";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
});

export const metadata = {
  title: "Cottage Coins",
  description: "Finance management",
};

export default function RootLayout({ children }) {
  initCronJobs();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
