import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Minimal portfolio website built with Next.js and Tailwind CSS."
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
