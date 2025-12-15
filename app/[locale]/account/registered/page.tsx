"use client";

import { useState, useEffect } from "react";
import SignupConfirmation from "@/src/components/SignupConfirmation/SignupConfirmation";
import { type Cslptag } from "@contentstack/studio-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function RegisteredPage({ params }: Props) {
  const [locale, setLocale] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);
    };
    getParams();
  }, [params]);

  return (
    <SignupConfirmation
      confirmationText="A signup confirmation has been sent to your email address."
      $confirmationText={{ "data-cslp": "" } as Cslptag}
      returnButtonText="Return to Login"
      $returnButtonText={{ "data-cslp": "" } as Cslptag}
      returnButtonHref={`/${locale}/account/login`}
    />
  );
}

