import Field from "@/components/Field";
import useAuth from "@/hooks/useAuth";
import type { RegisterDTO } from "@/types/auth";
import { useState, type SubmitEvent } from "react";
import FormError from "./FormError";
import encryptionServiceInstance from "@/services/EncryptionService";

const RegisterForm = () => {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Pick<
      RegisterDTO,
      "username" | "display_name" | "password"
    > & { confirm_password: string };
    console.log("register form data ", data);
    try {
      if (data.password !== data.confirm_password)
        throw new Error("Both passwords should match");
      setError(null);
      setIsLoading(true);
      const keyMaterial =
        await encryptionServiceInstance.buildRegistrationKeyMaterial(
          data.password,
        );
      console.log("key materialdata \n", keyMaterial);
      register({ ...data, ...keyMaterial });
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
        label="Display name"
        name="display_name"
        autoComplete="display_name"
        placeholder="Your display name"
        required
        minLength={3}
      />

      <Field
        label="Username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="Enter your username"
        required
        minLength={3}
      />

      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="password"
        placeholder="At least 8 characters"
        required
        minLength={8}
      />
      <Field
        label="Confirm Password"
        name="confirm_password"
        type="password"
        autoComplete="password"
        placeholder="At least 8 characters"
        required
        minLength={8}
      />
      <FormError error={error} />
      <button
        disabled={isLoading}
        type="submit"
        className={`bg-ink ${isLoading && "cursor-not-allowed opacity-50"} text-page hover:bg-ink/90 mt-1 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium shadow-[0_1px_2px_rgba(20,20,24,0.18),0_4px_12px_-2px_rgba(20,20,24,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,transform] active:scale-[0.99]`}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default RegisterForm;
