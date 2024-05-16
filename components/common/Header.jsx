"use client";
import Link from "next/link";
import MainButton from "./MainButton";
import { navLinks } from "@/lib/constants";
import userStore from "@/store/store";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const removeUser = userStore((state) => state.removeUser);

  async function getUserDetails() {
    setLoading(true);
    const response = await fetch("/api/user/profile", {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      setUser(data);
    }
    setLoading(false);
  }

  async function signOut() {
    setLoading(true);
    const response = await fetch("/api/user/profile", {
      method: "POST",
    });

    if (response.status === 200) {
      removeUser();
      router.push("/");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!user) {
      getUserDetails();
    } else {
      console.log(user);
    }
  }, [user]);

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
        {user && (
          <p
            onClick={signOut}
            className="text-primary hover:text-sec transition-colors duration-500 cursor-pointer"
          >
            Sign out
          </p>
        )}
      </div>

      <div className="lg:flex hidden justify-center items-center gap-10">
        {loading ? (
          <>
            <Skeleton className="w-[100px] h-[40px] rounded-md bg-blue-200" />
            <Skeleton className="w-[100px] h-[40px] rounded-md bg-zinc-400" />
          </>
        ) : user ? (
          <MainButton bgColor="bg-primary" to="/dashboard" label="Dashboard" />
        ) : (
          <>
            <MainButton to="/auth/sign-up" label="Get Started" />
            <MainButton
              to="/auth/sign-in"
              label="Sign in"
              bgColor="bg-primary"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
