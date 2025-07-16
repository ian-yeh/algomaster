import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './global.css';

import { AuthProvider } from '@/contexts/AuthContext';

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
        <AuthProvider>
          <Navbar />
          <main className='relative overflow-hidden'>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
