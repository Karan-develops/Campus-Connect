import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarWrapper />
      {children}
      <Footer />
    </>
  );
}
