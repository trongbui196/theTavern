import Navbar from '../common/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#4B2E2B]/95">
      <Navbar />
      {children}
    </div>
  );
}