import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Book",
  description: "Share a book with the BookNook community library",
};

export default function AddBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
