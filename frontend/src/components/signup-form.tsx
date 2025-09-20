"use client"

import { z } from "zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "@/lib/schemas" // import schema
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type SignupData = z.infer<typeof signupSchema>

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupData>({ resolver: zodResolver(signupSchema) })

    function onSubmit(data: SignupData) {
        // Call your API to create the user here.
        console.log("Form data", data)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden bg-card/80 backdrop-blur p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Create an account</h1>
                                <p className="text-muted-foreground text-balance">
                                    Sign up for a new ProjectXYZ account
                                </p>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" {...register("name")} placeholder="John Doe" />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register("email")} placeholder="m@example.com" />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register("password")} />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Signing up..." : "Sign Up"}
                            </Button>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="/" className="underline underline-offset-4">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </form>

                    <div className="bg-muted relative hidden md:block">
                        <img src="/2.jpg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
