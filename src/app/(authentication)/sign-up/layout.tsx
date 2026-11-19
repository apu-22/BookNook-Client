import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to join the BookNook book-sharing community",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
