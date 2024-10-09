import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Social from "./social";

interface FormWrapperProps {
  children: React.ReactNode;
  heading: string;
  headingLabel: string;
  backButtonLabel: string;
  backButtonLink: string;
  socialLink?: boolean;
}

export default function FormWrapper({
  heading,
  backButtonLabel,
  backButtonLink,
  children,
  headingLabel,
  socialLink,
}: FormWrapperProps) {
  return (
    <Card className="w-full sm:w-[400px] ">
      <CardHeader className="text-center">
        <h1 className="text-3xl font-semibold">{heading}</h1>
        <p>{headingLabel}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>

      {socialLink && (
        <CardFooter>
          {" "}
          <Social />{" "}
        </CardFooter>
      )}
      {backButtonLabel && (
        <CardFooter className="w-full flex items-center justify-center">
          <Button variant={"link"} asChild>
            <Link href={backButtonLink}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
