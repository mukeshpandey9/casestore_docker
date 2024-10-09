"use client";

import { useForm } from "react-hook-form";
import FormWrapper from "./form-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
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
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/actions/register";
import { useRouter } from "next/navigation";
import { AuthError } from "./auth-error";
import { AuthSuccess } from "./auth-success";
export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerhandler = (values: z.infer<typeof registerSchema>) => {
    createUser(values);
  };

  const {
    mutate: createUser,
    isError,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: Register,
    onSuccess: (data) => {
      console.log("Email Sent");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  if (isPending) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <FormWrapper
      heading="Signup"
      headingLabel="Welcome to CaseStore"
      backButtonLabel="Already have an Account?"
      backButtonLink="/auth/login"
      socialLink
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerhandler)}
          className="space-y-2"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          {isError && <AuthError message={error.message} />}
          {isSuccess && <AuthSuccess message={"Verification Code Sent"} />}
          <Button
            type="submit"
            // onClick={() => signIn()}
            className="w-full"
            size={"lg"}
          >
            Register
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
