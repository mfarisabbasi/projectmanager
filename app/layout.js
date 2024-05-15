import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import { Toaster } from "@/components/ui/toaster";

const open = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Project Manager",
  description: "Later",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={open.className}>
        <Header />
        <main className="main">{children}</main>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
