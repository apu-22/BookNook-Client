import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View your BookNook member profile and book lending stats",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
