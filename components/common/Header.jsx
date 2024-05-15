import Link from "next/link";
import MainButton from "./MainButton";
import { navLinks } from "@/lib/constants";

const Header = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <Link href="/">
        <h1 className="sm:block hidden text-3xl font-bold">
          Project Management
        </h1>
        <h1 className="sm:hidden block text-3xl font-bold">PM</h1>
      </Link>

      <div className="lg:flex hidden gap-10 items-center justify-center font-medium">
        {navLinks.map((link, index) => {
          return (
            <Link
              key={index}
              className="text-primary hover:text-sec transition-colors duration-500"
              href="/"
            >
              {link.title}
            </Link>
          );
        })}
      </div>

      <div className="lg:flex hidden justify-center items-center gap-10">
        <MainButton to="/auth/sign-up" label="Get Started" />
        <MainButton to="/auth/sign-in" label="Sign in" bgColor="bg-primary" />
      </div>
    </nav>
  );
};

export default Header;
