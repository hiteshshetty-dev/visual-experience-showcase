"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/utils/supabase";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import AuthPageLayout from "@/src/components/AuthPageLayout/AuthPageLayout";
import { type Cslptag } from "@contentstack/studio-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function NewPasswordPage({ params }: Props) {
  const [locale, setLocale] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);
    };
    getParams();
  }, [params]);

  const handleSubmit = async (
    formState: "login" | "register" | "reset" | "new-password",
    data: { email: string; password: string; confirmPassword: string }
  ) => {
    setError("");
    setSuccess("");

    try {
      if (formState === "new-password") {
        if (data.password !== data.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const { error } = await supabase.auth.updateUser({
          password: data.password,
        });
        if (error) throw error;
        setSuccess("Password updated successfully!");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("❌ Auth error:", errorMessage);
    }
  };

  return (
    <AuthPageLayout error={error} success={success}>
      <AuthForm
        loginTitle="Login"
        $loginTitle={{ "data-cslp": "" } as Cslptag}
        loginAccountQuestion="Don't have an account?"
        $loginAccountQuestion={{ "data-cslp": "" } as Cslptag}
        loginAccountAction="Sign up"
        $loginAccountAction={{ "data-cslp": "" } as Cslptag}
        loginEmailLabel="Email"
        $loginEmailLabel={{ "data-cslp": "" } as Cslptag}
        loginPasswordLabel="Password"
        $loginPasswordLabel={{ "data-cslp": "" } as Cslptag}
        loginForgotPassword="Forgot password?"
        $loginForgotPassword={{ "data-cslp": "" } as Cslptag}
        loginButtonText="Login"
        $loginButtonText={{ "data-cslp": "" } as Cslptag}
        resetTitle="Reset Password"
        $resetTitle={{ "data-cslp": "" } as Cslptag}
        resetEmailLabel="Email"
        $resetEmailLabel={{ "data-cslp": "" } as Cslptag}
        resetButtonText="Send Reset Link"
        $resetButtonText={{ "data-cslp": "" } as Cslptag}
        newPasswordTitle="New Password"
        $newPasswordTitle={{ "data-cslp": "" } as Cslptag}
        newPasswordLabel="New Password"
        $newPasswordLabel={{ "data-cslp": "" } as Cslptag}
        newPasswordConfirmLabel="Confirm New Password"
        $newPasswordConfirmLabel={{ "data-cslp": "" } as Cslptag}
        newPasswordButtonText="Change Password"
        $newPasswordButtonText={{ "data-cslp": "" } as Cslptag}
        registerTitle="Sign Up"
        $registerTitle={{ "data-cslp": "" } as Cslptag}
        registerBackText="Back to Login"
        $registerBackText={{ "data-cslp": "" } as Cslptag}
        registerEmailLabel="Email"
        $registerEmailLabel={{ "data-cslp": "" } as Cslptag}
        registerPasswordLabel="Password"
        $registerPasswordLabel={{ "data-cslp": "" } as Cslptag}
        registerButtonText="Sign Up"
        $registerButtonText={{ "data-cslp": "" } as Cslptag}
        initialFormState="new-password"
        onSubmit={handleSubmit}
      />
    </AuthPageLayout>
  );
}

