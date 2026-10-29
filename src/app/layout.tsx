import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "디지털 윤리 수행평가",
  description: "중학교 1학년 디지털 윤리(사이버 폭력) 서논술형 수행평가 도구",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
