import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <div>
      <h1 className="text-center text-3xl">This is the Profilepage</h1>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.name}</p>
    </div>
  );
}
