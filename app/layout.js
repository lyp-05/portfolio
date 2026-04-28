import "./globals.css";

export const metadata = {
  title: "LYP",
  description: "Minimal portfolio website for LYP, built with Next.js and Tailwind CSS."
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
