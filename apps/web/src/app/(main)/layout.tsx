import { StackTheme } from "@stackframe/stack";
import Footer from '@/components/Footer';
import { UserProvider } from "@/contexts/UserContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <StackTheme>
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </StackTheme>
    </UserProvider>
  );
}
