import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const AuthError = ({ message = "Auth Failed" }) => {
  return (
    <div className="text-red-500 bg-red-500/10 flex items-center p-2 gap-4 rounded">
      <ExclamationTriangleIcon />
      {message}
    </div>
  );
};
