//import Navbar from '@/components/Navbar';
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import Footer from '@/components/Footer';
import './global.css';

export const metadata = {
  title: 'Algomaster',
  description: 'Algomaster is a platform for learning algorithms and data structures through interactive challenges and tutorials.', 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <main className="relative overflow-hidden">{children}</main>
            <Footer />
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
