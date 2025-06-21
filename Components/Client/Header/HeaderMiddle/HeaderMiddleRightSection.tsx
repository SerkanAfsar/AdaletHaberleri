"use client";
import { useMobileMenuContext } from "@/Contexts/MobileMenuContext";
import { Menu, Search } from "lucide-react";

export default function HeaderAsideRightSection() {
  const { setIsOpened } = useMobileMenuContext();
  return (
    <div className="ml-auto flex items-center justify-center gap-3">
      <Search size={25} />
      <Menu
        className="cursor-pointer xl:hidden"
        onClick={() => setIsOpened((prev: boolean) => !prev)}
        size={25}
      />
    </div>
  );
}
