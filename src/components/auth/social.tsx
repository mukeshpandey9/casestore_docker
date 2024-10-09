"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { GithubLogin, GoogleLogin } from "@/actions/OAuth";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant={"outline"}
        size={"lg"}
        className="w-full"
        onClick={() => {
          GoogleLogin();
        }}
      >
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        variant={"outline"}
        size={"lg"}
        className="w-full"
        onClick={() => {
          GithubLogin();
        }}
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  );
}
