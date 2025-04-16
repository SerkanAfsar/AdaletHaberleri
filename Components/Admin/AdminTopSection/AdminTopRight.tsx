"use client";
import useDarkMode from "@/Hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

export default function AdminTopRight() {
  const { isDark, toggleDarkMode } = useDarkMode();
  return (
    <div>
      <div
        onClick={() => toggleDarkMode()}
        className="flexCenter size-10 cursor-pointer rounded-full border border-slate-200 [&>svg]:text-sm [&>svg]:text-gray-500"
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </div>
    </div>
  );
}
