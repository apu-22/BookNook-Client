'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { signUp } from "@/lib/auth-client";

const DEFAULT_AVATAR = "https://github.com/shadcn.png";

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
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
            alert("Password does not match!");
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
                alert(error.message || "Failed to create account. Please try again.");
                return;
            }

            if (userData) {
                router.push('/');
            }
        } catch (err) {
            console.error("Sign up error:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
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
                                <div className="grid grid-cols-2 gap-2.5">
                                    <Button variant="outline" type="button" size="sm" className="h-9 gap-2 text-xs">
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Apple
                                    </Button>
                                    <Button variant="outline" type="button" size="sm" className="h-9 gap-2 text-xs">
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Google
                                    </Button>
                                </div>

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
