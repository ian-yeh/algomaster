import { AuthCheck } from '@/components/auth/AuthCheck';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
      <div className="">
        <nav>Dashboard Navigation</nav>
        <main>{children}</main>
      </div>
    </AuthCheck>
  );
}