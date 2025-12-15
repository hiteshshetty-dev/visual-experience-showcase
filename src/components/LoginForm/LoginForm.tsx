import React from 'react';
import { type Cslptag } from '@contentstack/studio-react';

interface LoginFormProps {
  welcomeTitle: string;
  $welcomeTitle: Cslptag;
  accountPromptText: string;
  $accountPromptText: Cslptag;
  createAccountText: string;
  $createAccountText: Cslptag;
  emailLabel: string;
  $emailLabel: Cslptag;
  passwordLabel: string;
  $passwordLabel: Cslptag;
  forgotPasswordText: string;
  $forgotPasswordText: Cslptag;
  loginButtonText: string;
  $loginButtonText: Cslptag;
  backgroundImageUrl: string;
}

const LoginForm = (props: LoginFormProps) => {
  return (
    <section>
      <div className="flex flex-row items-center min-h-screen bg-white m-0 p-0 font-['Poppins',sans-serif] md:flex-row sm:flex-col">
        <div className="flex items-center justify-center w-[944px] p-0 order-1 min-h-[1080px] lg:w-1/2 lg:px-5 lg:py-10 md:w-full md:px-5 md:py-10">
          <div className="flex flex-col items-center w-[512px] max-w-[512px] py-2 px-0 lg:w-full md:w-full">
            <h1 
              className="text-[30px] font-['Poppins',sans-serif] font-semibold leading-normal text-left text-[rgba(64,64,64,1)] m-0 mb-4 w-[228px] h-[45px] lg:text-[28px] lg:text-center lg:w-full md:text-2xl md:text-center md:w-full"
              {...props.$welcomeTitle}
              composable-node-id="9b17132c-dc08-45cc-8fe5-2fcffff1c5eb"
            >
              {props.welcomeTitle}
            </h1>
            
            <div className="flex flex-col items-center w-[214px] mb-4 h-[54px] m-auto lg:w-full md:w-full">
              <p 
                className="text-lg font-['Poppins',sans-serif] font-normal leading-normal text-left text-[rgba(64,64,64,1)] m-0 w-[214px] h-[27px] lg:text-[17px] lg:text-center md:text-base md:text-center"
                {...props.$accountPromptText}
                composable-node-id="6dc94cb5-f1c1-4d0b-bc62-be6c28e12aa5"
              >
                {props.accountPromptText}
              </p>
              <p 
                className="text-lg font-['Poppins',sans-serif] font-bold leading-normal text-left text-[rgba(64,64,64,1)] mt-1 w-[185px] h-[27px] ml-[14.5px] lg:text-[17px] lg:text-center lg:ml-0 md:text-base md:text-center md:ml-0"
                {...props.$createAccountText}
                composable-node-id="232bc484-63b1-4ef2-929f-b3ea4aa3148a"
              >
                {props.createAccountText}
              </p>
            </div>

            <div className="flex flex-col w-[320px] max-w-[320px] pt-4 h-[260px] lg:w-full md:w-full">
              <div className="flex flex-col w-full mb-4 h-[72px]">
                <label 
                  className="text-lg font-['Poppins',sans-serif] font-normal leading-8 text-left text-[rgba(64,64,64,1)] m-0 w-auto h-8 lg:text-[17px] md:text-base"
                  {...props.$emailLabel}
                  composable-node-id="d63d430e-badd-458f-8d17-37756093bd3c"
                >
                  {props.emailLabel}
                </label>
                <div 
                  className="w-[320px] h-10 bg-white border border-[rgba(229,231,235,1)] rounded-md mt-0 lg:w-full md:w-full"
                  composable-node-id="feae5597-545d-4cc5-a2ca-ad20764a8bb2"
                ></div>
              </div>

              <div className="flex flex-col w-full mb-4 h-[92px]">
                <label 
                  className="text-lg font-['Poppins',sans-serif] font-normal leading-8 text-left text-[rgba(64,64,64,1)] m-0 w-auto h-8 lg:text-[17px] md:text-base"
                  {...props.$passwordLabel}
                  composable-node-id="21f8bf30-3678-47f1-bc3c-46004653c25c"
                >
                  {props.passwordLabel}
                </label>
                <div 
                  className="w-[320px] h-10 bg-white border border-[rgba(229,231,235,1)] rounded-md mt-0 lg:w-full md:w-full"
                  composable-node-id="d471da3b-204f-4c19-b277-1f16d2e29f9b"
                ></div>
                <p 
                  className="text-xs font-['Poppins',sans-serif] font-bold leading-5 text-right text-[rgba(64,64,64,1)] m-0 mt-0 w-[320px] h-5 lg:w-auto md:w-auto"
                  {...props.$forgotPasswordText}
                  composable-node-id="f1c04bb7-f3ee-406a-8918-8298dfd021eb"
                >
                  {props.forgotPasswordText}
                </p>
              </div>

              <button 
                className="flex items-center justify-center w-[320px] h-12 bg-[rgba(8,145,178,1)] border border-[rgba(8,145,178,1)] rounded-md py-2 px-8 mt-4 cursor-pointer lg:w-full md:w-full"
                composable-node-id="7cf8b5fb-6b58-4ea5-b630-baf5147e9411"
              >
                <span 
                  className="text-lg font-['Poppins',sans-serif] font-bold tracking-[0.03em] leading-8 uppercase text-center text-white w-[58px] h-8 lg:text-[17px] md:text-base"
                  {...props.$loginButtonText}
                  composable-node-id="fba3f21f-dfb0-4d4b-b505-f9572e0d818f"
                >
                  {props.loginButtonText}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div 
          className="w-[976px] h-[1080px] bg-cover bg-center order-2 lg:w-1/2 lg:h-screen md:w-full md:h-[300px]"
          style={{ backgroundImage: `url(${props.backgroundImageUrl})` }}
          composable-node-id="26640626-42c6-4a49-af36-e010768c0a56"
        ></div>
      </div>
    </section>
  );
};

export default LoginForm;