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
        "dark:bg-dark-mode flex w-[75px] shrink-0 grow-0 flex-col bg-white text-gray-700 transition-all dark:text-white",
        isOpened && "w-[240px]",
      )}
    >
      <AdminTopSection
        className={cn(
          "flexCenter w-[101%] text-center text-lg font-bold transition-all",
        )}
      >
        <span
          className={cn(
            "block transition-all duration-100",
            isOpened
              ? "visible opacity-100 duration-1000"
              : "invisible opacity-0",
          )}
        >
          Adalet Haberleri
          <br /> Yönetim Paneli
        </span>
      </AdminTopSection>
      <AdminMenuList />
    </aside>
  );
}
