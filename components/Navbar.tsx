import { useRouter } from "next/router";
import React from "react";
import { DropdownProfile } from "./DropdownProfile";
import { SearchProfile } from "./SearchProfile";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="border-gray-200 bg-white px-2 dark:border-gray-700 dark:bg-gray-900 ">
      <div className="container mx-auto py-3 flex flex-wrap items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-10"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Portfolio Generator
          </span>
        </a>

        <SearchProfile />
        <DropdownProfile />
      </div>
    </nav>
  );
}

export default Navbar;
