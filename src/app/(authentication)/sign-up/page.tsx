'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/toast";
import { signIn, signUp } from "@/lib/auth-client";

const DEFAULT_AVATAR = "https://github.com/shadcn.png";

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as {
            email: string;
            name: string;
            password: string;
            confirmPassword?: string;
            image?: string;
        };

        // Confirm password validation
        if (data.password !== data.confirmPassword) {
            toast.add({
                title: "Passwords Do Not Match",
                description: "Please make sure your password and confirmation password match.",
                type: "error",
            });
            return;
        }

        // Remove confirmPassword from payload
        delete data.confirmPassword;

        // If no image is provided, fallback to default shadcn avatar
        const finalImage = data.image?.trim() ? data.image.trim() : DEFAULT_AVATAR;

        try {
            setLoading(true);
            const { data: userData, error } = await signUp.email({
                ...data,
                image: finalImage,
            });

            if (error) {
                console.error("Sign up error:", error);
                toast.add({
                    title: "Registration Failed",
                    description: error.message || "Failed to create account. Please try again.",
                    type: "error",
                });
                return;
            }

            if (userData) {
                toast.add({
                    title: "Account Created!",
                    description: "Welcome to BookNook! You have been registered and signed in.",
                    type: "success",
                });
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            console.error("Sign up error:", err);
            toast.add({
                title: "Registration Error",
                description: "Something went wrong. Please check your connection and try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    //social sign in handler
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
        <div className="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center px-4 py-6 sm:py-8">
            <div className="flex w-full max-w-lg flex-col gap-4">
                <Card className="shadow-sm">
                    <CardHeader className="text-center pb-2 pt-5">
                        <CardTitle className="text-lg sm:text-xl font-bold font-serif">Create an Account</CardTitle>
                        <CardDescription className="text-xs">
                            Sign up with your Apple or Google account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 pt-1">
                        <form onSubmit={handleSignUp}>
                            <FieldGroup className="gap-3">
                                {/* Social Login Buttons side by side */}
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

                                <FieldSeparator className="my-0.5 text-xs *:data-[slot=field-separator-content]:bg-card">
                                    Or continue with
                                </FieldSeparator>

                                {/* Row 1: Full Name & Email */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="name" className="text-xs">Full Name</FieldLabel>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            className="h-9 text-xs sm:text-sm"
                                            required
                                        />
                                    </Field>

                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="email" className="text-xs">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            className="h-9 text-xs sm:text-sm"
                                            required
                                        />
                                    </Field>
                                </div>

                                {/* Row 2: Image URL with Live Avatar Preview */}
                                <Field className="gap-1">
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor="image" className="text-xs">Image URL (Optional)</FieldLabel>
                                        <span className="text-[11px] text-muted-foreground">Default avatar if empty</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Input
                                            id="image"
                                            type="url"
                                            name="image"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            placeholder="https://example.com/avatar.jpg"
                                            className="h-9 flex-1 text-xs sm:text-sm"
                                        />
                                        <Avatar className="size-9 border border-border shrink-0">
                                            <AvatarImage
                                                src={imageUrl.trim() || DEFAULT_AVATAR}
                                                alt="Avatar preview"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </Field>

                                {/* Row 3: Password & Confirm Password */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="password" className="text-xs">Password</FieldLabel>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="h-9 text-xs sm:text-sm"
                                            required
                                        />
                                    </Field>

                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="confirmPassword" className="text-xs">Confirm Password</FieldLabel>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            className="h-9 text-xs sm:text-sm"
                                            required
                                        />
                                    </Field>
                                </div>

                                {/* Submit & Switch to Login */}
                                <div className="pt-1 flex flex-col gap-2">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-9 text-xs sm:text-sm bg-[#183b2b] hover:bg-[#122e22] text-white dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
                                    >
                                        {loading ? "Creating Account..." : "Sign Up"}
                                    </Button>
                                    <FieldDescription className="text-center text-xs">
                                        Have an account?{" "}
                                        <Link href="/sign-in" className="font-medium text-primary hover:underline">
                                            Login
                                        </Link>
                                    </FieldDescription>
                                </div>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>

                <FieldDescription className="px-6 text-center text-[11px] text-muted-foreground">
                    By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a>{" "}
                    and <a href="#" className="underline">Privacy Policy</a>.
                </FieldDescription>
            </div>
        </div>
    );
}
