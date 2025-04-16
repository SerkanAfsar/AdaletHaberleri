"use client";

import AdminTopSection from "../AdminTopSection";

import { cn } from "@/Utils";
import { useAdminContext } from "@/Contexts/AdminContext";
import AdminMenuList from "./AdminMenuList";

export default function AdminAside() {
  const { isOpened, registeredOpened, setIsOpened } = useAdminContext();

  return (
    <aside
      onMouseOver={() => setIsOpened(true)}
      onMouseLeave={() => {
        if (!registeredOpened) {
          setIsOpened(false);
        }
      }}
      className={cn(
        "dark:bg-dark-mode flex w-auto shrink-0 grow-0 flex-col bg-white text-gray-700 transition-all dark:text-white",
      )}
    >
      <AdminTopSection
        className={cn(
          "flexCenter w-[101%] text-center text-lg font-bold transition-all",
        )}
      >
        <span className={isOpened ? "block" : "hidden"}>
          Adalet Haberleri
          <br /> Yönetim Paneli
        </span>
      </AdminTopSection>
      <AdminMenuList />
    </aside>
  );
}
