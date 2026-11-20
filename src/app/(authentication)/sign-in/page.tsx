
'use client';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast";
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(
            formData.entries()
        ) as { email: string; password: string };

        try {
            setLoading(true);

            const { data: userData, error } = await signIn.email(data);

            if (error) {
                console.error("Login failed:", error.message);
                toast.add({
                    title: "Sign In Failed",
                    description: error.message || "Invalid email or password. Please try again.",
                    type: "error",
                });
                return;
            }

            if (userData) {
                toast.add({
                    title: "Welcome Back!",
                    description: "You have signed in successfully.",
                    type: "success",
                });
                router.push("/");
                router.refresh();
            }

        } catch (error) {
            console.error("Sign in error:", error);
            toast.add({
                title: "Sign In Error",
                description: "Something went wrong. Please check your connection and try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true);
            sessionStorage.setItem("show_welcome_toast", "true");
            const res = await signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (res?.error) {
                console.error("Google sign in error:", res.error.message);
                sessionStorage.removeItem("show_welcome_toast");
                toast.add({
                    title: "Google Sign In Failed",
                    description: res.error.message || "Could not sign in with Google. Please try again.",
                    type: "error",
                });
                setGoogleLoading(false);
            }
        } catch (error) {
            console.error("Google sign in error:", error);
            sessionStorage.removeItem("show_welcome_toast");
            toast.add({
                title: "Google Sign In Error",
                description: "Something went wrong during Google sign in. Please try again.",
                type: "error",
            });
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-14rem)] w-full items-center justify-center px-4 py-12">

            <div className="flex w-full max-w-md flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>
                            Sign in with your Google account or email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignIn}>
                            <FieldGroup>
                                <Field>
                                    <Button
                                        onClick={handleGoogleSignIn}
                                        variant="outline"
                                        type="button"
                                        disabled={loading || googleLoading}
                                        className="w-full gap-2"
                                    >
                                        {googleLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                                                <path
                                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        )}
                                        <span>{googleLoading ? "Connecting to Google..." : "Login with Google"}</span>
                                    </Button>
                                </Field>
                                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                    Or continue with
                                </FieldSeparator>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" name="password" type="password" required />
                                </Field>
                                <Field>
                                    {/* <Button type="submit">Login</Button> */}
                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Signing in..." : "Sign In"}
                                    </Button>
                                    <FieldDescription className="text-center">
                                        Don&apos;t have an account?
                                        <Link
                                            className="font-medium text-primary hover:underline cursor-pointer"
                                            href="/sign-up"
                                        >
                                            Sign Up
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
                <FieldDescription className="px-6 text-center">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </FieldDescription>
            </div>
        </div>

    )
}
