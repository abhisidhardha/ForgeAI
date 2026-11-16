/** Validate registration including password confirmation; send only server fields and show API errors. */
import { useState } from "react";
import { useRegisterMutation } from "../apis/authApi";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/authSchema";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
const Register = () => {
    const {
        handleSubmit,
        register: registerField,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const [localError, setLocalError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            setLocalError("");
            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
            };
            await register(userData).unwrap();
            reset();
            navigate("/login");
        } catch (err) {
            setLocalError(
                err?.data?.message || err?.message || "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-full overflow-hidden bg-background p-4">
            <span className="dotted-background" />

            <div className="relative z-10 w-full max-w-2xl">
                <div className="mb-3 text-center">
                    <span className="font-display text-2xl font-bold tracking-tight">
                        Forge<span className="text-blue-500">.ai</span>
                    </span>
                    <p className="mt-1 text-sm opacity-50">
                        Engineering operations, accelerated.
                    </p>
                </div>

                <div className="border-card rounded-2xl bg-card/60 backdrop-blur-sm px-8 py-8 flex flex-col gap-5">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Welcome
                        </h1>
                        <p className="mt-1 text-sm opacity-50">
                            Sign in to your workspace
                        </p>
                    </div>

                    {(isError || localError) && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            <span className="min-h-12">
                                {localError || error?.data?.message || "Something went wrong"}
                            </span>
                        </div>
                    )}

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit(handleRegister)}
                        noValidate
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="text"
                                {...registerField("name")}
                                placeholder="Your name"
                                label="Name"
                                error={errors?.name?.message}
                            />
                            <Input
                                type="email"
                                {...registerField("email")}
                                placeholder="you@company.com"
                                label="Email"
                                error={errors?.email?.message}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="password"
                                {...registerField("password")}
                                label="Password"
                                placeholder="••••••••"
                                error={errors?.password?.message}
                            />
                            <Input
                                type="password"
                                {...registerField("confirmPassword")}
                                label="Confirm Password"
                                placeholder="••••••••"
                                error={errors?.confirmPassword?.message}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full mt-2 justify-center"
                            disabled={isLoading}
                            isLoading={isLoading}
                            loadingText="Signing up..."
                        >
                            Sign Up
                        </Button>
                    </form>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-card-border opacity-50" />
                        <span className="text-xs opacity-40">or</span>
                        <div className="flex-1 h-px bg-card-border opacity-50" />
                    </div>

                    <div className="mx-auto">
                        <button className="border-card rounded-xl px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-ghost-hover transition-all duration-200 active:scale-95">
                            <GoogleIcon />
                            Log in with Google
                        </button>
                    </div>

                    <p className="text-center text-sm opacity-60">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 font-medium hover:text-blue-400 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

export default Register;
