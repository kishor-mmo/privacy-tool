import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href="/"
      className="font-bold text-3xl bg-gradient-to-r from-violet-500 to-pink-800 text-transparent bg-clip-text hover:cursor-pointer flex items-center"
    >
      PrivacyGuard
    </Link>
  );
}

export default Logo;
