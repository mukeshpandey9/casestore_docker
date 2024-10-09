"use client";
import { useForm } from "react-hook-form";
import FormWrapper from "./form-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AuthError } from "./auth-error";
import { AuthSuccess } from "./auth-success";
import { Login } from "@/actions/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginhandler = (values: z.infer<typeof loginSchema>) => {
    loginUser(values);
  };

  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    "Login successful"
  );

  const {
    mutate: loginUser,
    isError,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationKey: ["auth-login"],
    mutationFn: Login,
    onSuccess: (data) => {
      setSuccessMessage(data?.message);
    },
    onError: (error) => {
      console.log(error.message);
      // alert(error.message);
    },
  });

  if (isPending) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  return (
    <FormWrapper
      heading="Login"
      headingLabel="Welcome Back"
      backButtonLabel="Don't have an Account?"
      backButtonLink="/auth/register"
      socialLink
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(loginhandler)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isError && (
            <AuthError message={error.message.split(".")[0] as string} />
          )}
          {isSuccess && <AuthSuccess message={successMessage} />}

          <Button
            type="submit"
            // onClick={() => signIn()}
            className="w-full"
            size={"lg"}
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
