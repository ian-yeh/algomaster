
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}