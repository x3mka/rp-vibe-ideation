import './global.css';
import { ShellHeader } from '../components/ShellHeader';

export const metadata = {
  title: 'RP Vibe Ideation',
  description: 'A platform for iterating on independent ideation sub-apps',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <ShellHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
