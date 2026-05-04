import Field from "@/components/Field";
import useAuth from "@/hooks/useAuth";
import encryptionServiceInstance from "@/services/EncryptionService";
import type { RegisterDTO } from "@/types/auth";
import { useState, type SubmitEvent } from "react";
import FormError from "./FormError";

const RegisterForm = () => {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const submitForm = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Pick<
      RegisterDTO,
      "username" | "display_name" | "password"
    > & { confirm_password: string };

    try {
      if (data.password !== data.confirm_password)
        throw new Error("Both passwords should match");
      setError(null);
      setIsLoading(true);
      const keyMaterial =
        await encryptionServiceInstance.buildRegistrationKeyMaterial(
          data.password,
        );
      await register({ ...data, ...keyMaterial });
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
        autoComplete="name"
        placeholder="Your display name"
        required
        minLength={1}
        maxLength={64}
      />
      <Field
        label="Username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="Enter your username"
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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        required
        minLength={8}
        maxLength={128}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="space-y-1.5">
        <Field
          label="Confirm Password"
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          required
          minLength={8}
          maxLength={128}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordsMismatch && (
          <span className="text-danger text-xs">Passwords don't match</span>
        )}
      </div>
      <FormError error={error} />
      <button
        disabled={isLoading || passwordsMismatch}
        type="submit"
        className={`bg-ink ${
          (isLoading || passwordsMismatch) && "cursor-not-allowed opacity-50"
        } text-page hover:bg-ink/90 mt-1 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium shadow-[0_1px_2px_rgba(20,20,24,0.18),0_4px_12px_-2px_rgba(20,20,24,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,transform] active:scale-[0.99]`}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default RegisterForm;
