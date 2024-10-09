import { CheckCircledIcon } from "@radix-ui/react-icons";

export const AuthSuccess = ({ message = "Auth Success, Verify Email" }) => {
  return (
    <div className="text-emerald-500 bg-emerald-500/10 flex items-center p-2 gap-4 rounded">
      <CheckCircledIcon className="w-5 h-5" />
      {message}
    </div>
  );
};
