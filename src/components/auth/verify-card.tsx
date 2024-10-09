"use client";

import { useSearchParams } from "next/navigation";
import FormWrapper from "./form-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { EmailVerify } from "@/actions/verifyEmail";
import { AuthSuccess } from "./auth-success";
import { AuthError } from "./auth-error";
export default function VerifyCard() {
  const searchParam = useSearchParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const token = searchParam.get("token") as string;
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Verification token missing");
      return;
    }
    EmailVerify(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => setError("Something went wrong"));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <FormWrapper
      heading="Email Verification"
      headingLabel="we are verifying your email"
      backButtonLabel="Back to Login"
      backButtonLink="/auth/login"
    >
      <div className="flex items-center justify-center">
        {!success && !error && <BeatLoader />}
        {success && <AuthSuccess message={success} />}
        {error && <AuthError message={error} />}
      </div>
    </FormWrapper>
  );
}
