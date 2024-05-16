"use client";
import { navLinks } from "@/lib/constants";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import MainButton from "./MainButton";
import userStore from "@/store/store";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const removeUser = userStore((state) => state.removeUser);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  return (
    <nav className="flex items-center justify-between w-full">
      <Link href="/">
        <h1 className="sm:block hidden text-2xl font-bold">
          Project Management
        </h1>
        <h1 className="sm:hidden block text-2xl font-bold">PM</h1>
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

      <div className="lg:flex hidden justify-center items-center gap-6">
        {loading ? (
          <>
            <Skeleton className="w-[100px] h-[40px] rounded-md bg-blue-200" />
            <Skeleton className="w-[100px] h-[40px] rounded-md bg-zinc-400" />
          </>
        ) : user ? (
          <>
            <div className="relative py-2 px-4 rounded cursor-pointer">
              <FaBell size={20} />
              <span className="absolute bg-sec text-white px-[6px] py-[3px] text-xs font-bold rounded-full -top-1 -right-0">
                3
              </span>
            </div>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="inline-flex justify-center "
                >
                  <p
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="underline cursor-pointer flex items-center"
                  >
                    {user.fullName}
                    <IoMdArrowDropdown />
                  </p>
                </button>
              </div>

              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    onClick={() => setShowDropdown(false)}
                    className="flex flex-col gap-4 p-3"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      href="/dashboard"
                      className="text-primary hover:text-sec transition-colors duration-500 cursor-pointer"
                    >
                      Dashboard
                    </Link>
                    <p
                      onClick={signOut}
                      className="text-primary hover:text-sec transition-colors duration-500 cursor-pointer"
                    >
                      Sign out
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
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
