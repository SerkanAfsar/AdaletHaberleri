"use client";
import { Logs, Search } from "lucide-react";
import CustomTextBox from "../../UI/CustomInput";
import { useAdminContext } from "@/Contexts/AdminContext";

export default function AdminTopSearch() {
  const { setRegisteredOpened } = useAdminContext();

  return (
    <div className="flexCenter gap-3">
      <div onClick={() => setRegisteredOpened((val) => !val)}>
        <div className="ml-1 flex cursor-pointer items-center justify-center rounded-md bg-slate-50 p-2">
          <Logs />
        </div>
      </div>
      <CustomTextBox
        icon={<Search />}
        className="w-96 py-2"
        placeholder="Arama Yapınız..."
      />
    </div>
  );
}
