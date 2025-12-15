"use client";

import React, { useState, FormEvent } from "react";
import { type Cslptag } from "@contentstack/studio-react";

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
  initialFormState?: FormState;
  onForgotPasswordClick?: () => void;
  onSubmit?: (
    formState: FormState,
    data: { email: string; password: string; confirmPassword: string }
  ) => Promise<void>;
}

const AuthForm = (props: AuthFormProps) => {
  const [currentForm, setCurrentForm] = useState<FormState>(props.initialFormState || "login");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormTransition = (nextForm: FormState) => {
    setCurrentForm(nextForm);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (props.onSubmit) {
        await props.onSubmit(currentForm, { email, password, confirmPassword });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[512px] p-2 box-border md:p-4 relative overflow-hidden">
      {currentForm === "login" && (
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
            onClick={() => handleFormTransition("register")}
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
                if (props.onForgotPasswordClick) {
                  props.onForgotPasswordClick();
                } else {
                  handleFormTransition("reset");
                }
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

      {currentForm === "register" && (
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
              onClick={() => handleFormTransition("login")}
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

      {currentForm === "reset" && (
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

      {currentForm === "new-password" && (
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
