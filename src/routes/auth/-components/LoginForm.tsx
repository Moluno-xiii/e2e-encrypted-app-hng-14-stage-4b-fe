import Field from "@/components/Field";
import useAuth from "@/hooks/useAuth";
import type { LoginDTO } from "@/types/auth";
import { useState, type SubmitEvent } from "react";
import FormError from "./FormError";

const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as LoginDTO;
    try {
      setError(null);
      setIsLoading(true);
      await login(data);
    } catch (e) {
      const errMessage = e instanceof Error ? e.message : "unexpected error";
      setError(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submitForm}>
      <Field
        label="Username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="username"
        required
        minLength={3}
        maxLength={32}
        pattern="[a-zA-Z0-9_\-]{3,32}"
        title="3–32 characters: letters, digits, underscores, or hyphens"
      />

      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
        minLength={8}
        maxLength={128}
      />

      <FormError error={error} />
      <button
        disabled={isLoading}
        type="submit"
        className={`bg-ink text-page hover:bg-ink/90 mt-1 flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-[background-color,transform] active:scale-[0.99] ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {isLoading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
