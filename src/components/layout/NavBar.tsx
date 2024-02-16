"use client";
import * as React from "react";
import { Button } from "../ui/button";
import NavMenu from "../extras/NavMenu";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="fixed z-10 top-0 left-0 w-full bg-background content-center grid grid-cols-3 h-20 justify-between gap-40">
      <Link href="/" className="text-end text-2xl font-black">
        Dhk Text
      </Link>
      <NavMenu />
    </div>
  );
}
