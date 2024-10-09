export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-sky-500 w-full flex items-center justify-center">
      {children}
    </div>
  );
}
