"use client";

import { useState, FormEvent, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Cslptag } from "@contentstack/studio-react";
import { supabase } from "@/src/lib/supabase";

type FormState = "login" | "register" | "reset" | "new-password";

interface AuthFormProps {
  loginTitle: string;
  $loginTitle: Cslptag;
  loginAccountQuestion: string;
  $loginAccountQuestion: Cslptag;
  loginAccountAction: string;
  $loginAccountAction: Cslptag;
  loginEmailLabel: string;
  $loginEmailLabel: Cslptag;
  loginPasswordLabel: string;
  $loginPasswordLabel: Cslptag;
  loginForgotPassword: string;
  $loginForgotPassword: Cslptag;
  loginButtonText: string;
  $loginButtonText: Cslptag;
  resetTitle: string;
  $resetTitle: Cslptag;
  resetEmailLabel: string;
  $resetEmailLabel: Cslptag;
  resetButtonText: string;
  $resetButtonText: Cslptag;
  newPasswordTitle: string;
  $newPasswordTitle: Cslptag;
  newPasswordLabel: string;
  $newPasswordLabel: Cslptag;
  newPasswordConfirmLabel: string;
  $newPasswordConfirmLabel: Cslptag;
  newPasswordButtonText: string;
  $newPasswordButtonText: Cslptag;
  registerTitle: string;
  $registerTitle: Cslptag;
  registerBackText: string;
  $registerBackText: Cslptag;
  registerEmailLabel: string;
  $registerEmailLabel: Cslptag;
  registerPasswordLabel: string;
  $registerPasswordLabel: Cslptag;
  registerButtonText: string;
  $registerButtonText: Cslptag;
}

const AuthForm = (props: AuthFormProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isLoginPage = pathname.includes("login");
  const isResetPage = pathname.includes("resetpassword");
  const isChangePasswordPage = pathname.includes("changepassword");

  const currentForm: FormState = isResetPage
    ? "reset"
    : isChangePasswordPage
    ? "new-password"
    : showRegister
    ? "register"
    : "login";

  useEffect(() => {
    if (isChangePasswordPage) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");
      
      if (accessToken && type === "recovery") {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: hashParams.get("refresh_token") || "",
        }).catch((err) => {
          console.error("Error setting session:", err);
          setError("Invalid or expired reset link");
        });
      }
    }
  }, [isChangePasswordPage]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const locale = pathname.split('/').filter(Boolean)[0] || "en-us";

    try {
      switch (currentForm) {
        case "login": {
          const { data: authData, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          router.push(`/${locale}`);
          break;
        }
        case "register": {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          router.push(`/${locale}/account/registered`);
          break;
        }
        case "reset": {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/${locale}/account/changepassword`,
          });
          if (error) throw error;
          setSuccess("Password reset email sent! Check your inbox.");
          break;
        }
        case "new-password": {
          if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
          }
          const { error } = await supabase.auth.updateUser({
            password,
          });
          if (error) throw error;
          setSuccess("Password updated successfully!");
          setTimeout(() => {
            router.push(`/${locale}/account/login`);
          }, 2000);
          break;
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("❌ Auth error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-2 box-border md:p-4 relative overflow-hidden">
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
      {isLoginPage && !showRegister && (
        <div className="w-full">
          {/* Login Form */}
          <div
            className="w-full py-2 flex flex-col items-center"
            data-state="login"
            data-figma-id="8:57"
          >
        <h1
          className="text-[30px] md:text-[24px] font-semibold text-center text-[rgba(64,64,64,1)] mb-4"
          {...props.$loginTitle}
        >
          {props.loginTitle}
        </h1>

        <div className="flex flex-col items-center mb-4 gap-0">
          <p
            className="text-[18px] md:text-[16px] font-normal text-[rgba(64,64,64,1)] m-0"
            {...props.$loginAccountQuestion}
          >
            {props.loginAccountQuestion}
          </p>
          <p
            className="text-[18px] md:text-[16px] font-bold text-[rgba(64,64,64,1)] m-0 cursor-pointer underline"
            {...props.$loginAccountAction}
            onClick={() => setShowRegister(true)}
          >
            {props.loginAccountAction}
          </p>
        </div>

        <form
          className="w-full max-w-[320px] flex flex-col gap-4 pt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-0">
            <label
              className="text-[18px] md:text-[16px] font-normal leading-8 text-[rgba(64,64,64,1)] m-0"
              {...props.$loginEmailLabel}
            >
              {props.loginEmailLabel}
            </label>
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[40px] bg-white border border-[rgba(229,231,235,1)] rounded-md box-border px-3 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-0 relative">
            <label
              className="text-[18px] md:text-[16px] font-normal leading-8 text-[rgba(64,64,64,1)] m-0"
              {...props.$loginPasswordLabel}
            >
              {props.loginPasswordLabel}
            </label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] bg-white border border-[rgba(229,231,235,1)] rounded-md box-border px-3 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p
              className="text-[12px] font-bold leading-5 text-right text-[rgba(64,64,64,1)] m-0 mt-0 cursor-pointer"
              {...props.$loginForgotPassword}
              onClick={() => {
                const locale = pathname.split('/').filter(Boolean)[0] || "en-us";
                router.push(`/${locale}/account/resetpassword`);
              }}
            >
              {props.loginForgotPassword}
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] flex items-center justify-center bg-[rgba(8,145,178,1)] border border-[rgba(8,145,178,1)] rounded-md px-8 py-2 cursor-pointer mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span
              className="text-[18px] md:text-[16px] font-bold tracking-[0.03em] leading-8 uppercase text-white"
              {...props.$loginButtonText}
            >
              {isLoading ? "LOADING..." : props.loginButtonText}
            </span>
          </button>
        </form>
          </div>
        </div>
      )}

      {isLoginPage && showRegister && (
        <div className="w-full">
          {/* Register Form */}
          <div
            className="w-full py-2 flex flex-col items-center"
            data-state="register"
            data-figma-id="8:100"
          >
            <h1
              className="text-[30px] md:text-[24px] font-semibold text-center text-[rgba(64,64,64,1)] mb-4"
              {...props.$registerTitle}
            >
              {props.registerTitle}
            </h1>

            <div
              className="flex items-center justify-center gap-1 mb-[27px] md:mb-5 cursor-pointer"
              onClick={() => setShowRegister(false)}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-white relative">
                <div
                  className="w-4 h-[14px] bg-[rgba(64,64,64,1)] border border-[rgba(107,114,128,1)]"
                  style={{
                    clipPath:
                      "polygon(40% 0%, 40% 35%, 100% 35%, 100% 65%, 40% 65%, 40% 100%, 0% 50%)",
                  }}
                />
              </div>
              <p
                className="text-[18px] md:text-[16px] font-normal text-[rgba(64,64,64,1)] m-0"
                {...props.$registerBackText}
              >
                {props.registerBackText}
              </p>
            </div>

            <form
              className="w-full max-w-[320px] flex flex-col gap-4 pt-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-0">
                <label
                  className="text-[18px] md:text-[16px] font-normal leading-8 text-[rgba(64,64,64,1)] m-0"
                  {...props.$registerEmailLabel}
                >
                  {props.registerEmailLabel}
                </label>
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[40px] bg-white border border-[rgba(229,231,235,1)] rounded-md box-border px-3 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-0">
                <label
                  className="text-[18px] md:text-[16px] font-normal leading-8 text-[rgba(64,64,64,1)] m-0"
                  {...props.$registerPasswordLabel}
                >
                  {props.registerPasswordLabel}
                </label>
                <input
                  type="password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[40px] bg-white border border-[rgba(229,231,235,1)] rounded-md box-border px-3 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] flex items-center justify-center bg-[rgba(8,145,178,1)] border border-[rgba(8,145,178,1)] rounded-md px-8 py-2 cursor-pointer mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span
                  className="text-[18px] md:text-[16px] font-bold tracking-[0.03em] leading-8 uppercase text-white"
                  {...props.$registerButtonText}
                >
                  {isLoading ? "REGISTERING..." : props.registerButtonText}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {isResetPage && (
        <div
          className="w-full py-2 flex flex-col items-center"
          data-state="reset"
          data-figma-id="8:75"
        >
        <h1
          className="text-[30px] md:text-[24px] font-semibold text-center text-[rgba(64,64,64,1)] mb-4"
          {...props.$resetTitle}
        >
          {props.resetTitle}
        </h1>

        <form
          className="w-full max-w-[320px] flex flex-col gap-4 pt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-0">
            <label
              className="text-[18px] md:text-[16px] font-normal leading-8 text-[rgba(64,64,64,1)] m-0"
              {...props.$resetEmailLabel}
            >
              {props.resetEmailLabel}
            </label>
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[40px] bg-white border border-[rgba(229,231,235,1)] rounded-md box-border px-3 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] flex items-center justify-center bg-[rgba(8,145,178,1)] border border-[rgba(8,145,178,1)] rounded-md px-8 py-2 cursor-pointer mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span
              className="text-[18px] md:text-[16px] font-bold tracking-[0.03em] leading-8 uppercase text-white"
              {...props.$resetButtonText}
            >
              {isLoading ? "SENDING..." : props.resetButtonText}
            </span>
          </button>
        </form>
        </div>
      )}

      {isChangePasswordPage && (
        <div
          className="w-full py-2 flex flex-col items-center"
          data-state="new-password"
          data-figma-id="8:86"
        >
        <h1
          className="text-[30px] md:text-[24px] font-semibold text-center text-[rgba(64,64,64,1)] mb-4"
          {...props.$newPasswordTitle}
        >
          {props.newPasswordTitle}
        </h1>

        <form
          className="w-full max-w-[320px] flex flex-col gap-4 pt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-0">
            <label
              className="text-[18px] md:text-[16px] font-normal leading-8 text-[rgba(64,64,64,1)] m-0"
              {...props.$newPasswordLabel}
            >
              {props.newPasswordLabel}
            </label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] bg-white border border-[rgba(229,231,235,1)] rounded-md box-border px-3 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-0">
            <label
              className="text-[18px] md:text-[16px] font-normal leading-8 text-[rgba(64,64,64,1)] m-0"
              {...props.$newPasswordConfirmLabel}
            >
              {props.newPasswordConfirmLabel}
            </label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[40px] bg-white border border-[rgba(229,231,235,1)] rounded-md box-border px-3 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] flex items-center justify-center bg-[rgba(8,145,178,1)] border border-[rgba(8,145,178,1)] rounded-md px-8 py-2 cursor-pointer mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span
              className="text-[18px] md:text-[16px] font-bold tracking-[0.03em] leading-8 uppercase text-white"
              {...props.$newPasswordButtonText}
            >
              {isLoading ? "CHANGING..." : props.newPasswordButtonText}
            </span>
          </button>
        </form>
        </div>
      )}

    </div>
  );
};

export default AuthForm;
