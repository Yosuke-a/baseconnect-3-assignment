import { JobsProvider } from "@/components/jobprovider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <JobsProvider>{children}</JobsProvider>
      </body>
    </html>
  );
}
