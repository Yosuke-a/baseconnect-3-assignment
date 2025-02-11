import { JobsProvider } from "@/components/jobprovider";
import { Header } from "@/components/header";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <JobsProvider>{children}</JobsProvider>
      </body>
    </html>
  );
}
