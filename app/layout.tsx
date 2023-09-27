import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
