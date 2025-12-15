"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/utils/supabase";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import { type Cslptag } from "@contentstack/studio-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function AuthPage({ params }: Props) {
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

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("❌ Error getting user:", error);
        return;
      }

      if (user) {
        console.log("✅ Current user:", {
          id: user.id,
          email: user.email,
          createdAt: user.created_at,
          lastSignIn: user.last_sign_in_at,
          metadata: user.user_metadata,
        });
      } else {
        console.log("ℹ️ No user is currently logged in");
      }
    };

    getCurrentUser();
  }, []);

  const handleSubmit = async (
    formState: "login" | "register" | "reset" | "new-password",
    data: { email: string; password: string; confirmPassword: string }
  ) => {
    setError("");
    setSuccess("");

    try {
      switch (formState) {
        case "login": {
          const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });
          if (error) throw error;
          console.log("✅ User signed in successfully:", {
            userId: authData.user?.id,
            email: authData.user?.email,
            session: authData.session ? "Active" : "No session",
          });
          setSuccess("Successfully signed in!");
          break;
        }
        case "register": {
          if (data.password !== data.confirmPassword) {
            throw new Error("Passwords do not match");
          }
          const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
          });
          if (error) throw error;
          console.log("✅ User signed up successfully:", {
            userId: authData.user?.id,
            email: authData.user?.email,
            needsConfirmation: !authData.session,
          });
          setSuccess("Account created! Check your email for confirmation.");
          break;
        }
        case "reset": {
          const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
            redirectTo: `${window.location.origin}/${locale}/account/login`,
          });
          if (error) throw error;
          setSuccess("Password reset email sent! Check your inbox.");
          break;
        }
        case "new-password": {
          if (data.password !== data.confirmPassword) {
            throw new Error("Passwords do not match");
          }
          const { error } = await supabase.auth.updateUser({
            password: data.password,
          });
          if (error) throw error;
          setSuccess("Password updated successfully!");
          break;
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("❌ Auth error:", errorMessage);
    }
  };

  return (
    <section className="h-screen overflow-hidden">
      <div className="flex flex-row items-center h-screen bg-white m-0 p-0 font-['Poppins',sans-serif] md:flex-row sm:flex-col overflow-hidden">
        <div className="flex items-center justify-center w-1/2 p-0 order-1 h-full lg:w-1/2 lg:px-5 lg:py-10 md:w-full md:px-5 md:py-10">
          <div className="flex flex-col items-center w-full max-w-[512px] py-2 px-0 lg:w-full md:w-full">
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded w-full">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded w-full">
                {success}
              </div>
            )}
            <AuthForm
              loginTitle="Login"
              $loginTitle={{ "data-cslp": "" } as Cslptag}
              loginAccountQuestion="Create and account"
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
              newPasswordButtonText="Update Password"
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
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        <div 
          className="w-1/2 h-full bg-cover bg-center order-2 lg:w-1/2 lg:h-full md:w-full md:h-[300px]"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&q=80)` }}
        ></div>
      </div>
    </section>
  );
}

