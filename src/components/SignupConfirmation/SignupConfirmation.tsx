import { type Cslptag } from '@contentstack/studio-react';

interface SignupConfirmationProps {
  confirmationText: string;
  $confirmationText: Cslptag;
  returnButtonText: string;
  $returnButtonText: Cslptag;
  returnButtonHref: string;
}

const SignupConfirmation = (props: SignupConfirmationProps) => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white px-0 py-0 box-border max-w-[1920px] h-[1080px] md:px-6 md:py-6 sm:px-6 sm:py-6">
      <div 
        className="w-full max-w-[1920px] flex items-center justify-center bg-white p-0 box-border h-[1080px] md:w-full md:min-h-screen md:p-6 sm:w-full sm:min-h-screen sm:p-6"
        data-figma-root="17:118"
        data-figma-id="17:118"
        composable-node-id="6042e277-4d29-4a15-8269-0ebf7167b35d"
      >
        <div 
          className="w-[944px] max-w-[944px] flex flex-col items-center justify-center gap-2.5 h-[1080px] md:w-full md:max-w-[600px] md:gap-8 sm:w-full sm:max-w-[512px] sm:gap-6"
          data-figma-id="17:119"
          composable-node-id="551929a0-92a3-4e24-84a1-1bd3d20e02ce"
        >
          <div 
            className="w-[240px] h-auto aspect-240/257 bg-[url(https://composo-image.contentstack.com/e961877c-72cc-4fc3-bb28-e7abc502a9b9)] bg-contain bg-no-repeat bg-center md:w-[220px] sm:w-[180px]"
            data-figma-id="17:120"
            composable-node-id="b6705f68-35ba-4e59-abad-35720232c420"
          />
          <div 
            className="w-[512px] flex flex-col items-center justify-center gap-4 py-2 md:w-full md:gap-6 sm:w-full sm:gap-6"
            data-figma-id="17:121"
            composable-node-id="77f81dee-af81-4add-9501-92f3eb2187db"
          >
            <p 
              className="w-[902px] text-[30px] font-['Poppins',sans-serif] font-medium leading-normal text-left text-[rgba(64,64,64,1)] m-0 p-0 md:w-full md:text-[26px] md:leading-[1.5] md:text-center md:px-4 sm:w-full sm:text-[20px] sm:leading-[1.5] sm:text-center sm:px-4"
              data-figma-id="17:122"
              composable-node-id="6db561b6-5350-4a47-998f-f430298076a5"
              {...props.$confirmationText}
            >
              {props.confirmationText}
            </p>
            <div 
              className="w-[230px] flex items-center justify-center pt-4 md:w-full sm:w-full"
              data-figma-id="17:123"
              composable-node-id="7c6afc3b-5721-4a37-8195-dfd450eb8f82"
            >
              <a 
                href={props.returnButtonHref}
                className="w-[230px] max-w-[230px] h-12 flex items-center justify-center bg-[rgba(8,145,178,1)] border border-[rgba(8,145,178,1)] rounded-md px-8 py-2 cursor-pointer no-underline box-border md:w-full md:max-w-[230px] sm:w-full sm:max-w-[230px]"
                data-figma-id="17:124"
                composable-node-id="a442c20b-a5b2-44b2-ae35-25ceaba801eb"
              >
                <span 
                  className="text-[18px] font-['Poppins',sans-serif] font-bold tracking-[0.54px] leading-8 uppercase text-center text-white m-0 whitespace-nowrap md:text-[17px] md:tracking-[0.48px] sm:text-base sm:tracking-[0.48px]"
                  data-figma-id="17:125"
                  composable-node-id="6b74a028-9e00-4600-8357-cfde4f804dcf"
                  {...props.$returnButtonText}
                >
                  {props.returnButtonText}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupConfirmation;