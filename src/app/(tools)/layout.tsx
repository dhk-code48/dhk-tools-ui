import { Navbar } from "@/components/layout/NavBar";
import React, { FC } from "react";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background w-[50%] mx-auto py-24 px-20">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
