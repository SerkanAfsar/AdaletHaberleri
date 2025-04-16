import { useAdminContext } from "@/Contexts/AdminContext";
import { AdmiMenuList } from "@/Data/Admin.data";
import { cn } from "@/Utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function AdminMenuList() {
  const { isOpened } = useAdminContext();
  const pathName = usePathname();
  console.log("rendered");
  return (
    <nav className="block w-full flex-auto overflow-x-auto overscroll-contain pb-3">
      <ul className="flex h-full w-full flex-col gap-3 px-3">
        {AdmiMenuList.map((item, index) => (
          <li
            key={index}
            className={cn("block w-full", item.isFunc && "mt-auto")}
          >
            <Link
              className={cn(
                "flex items-center justify-start gap-2 rounded px-4 py-2 whitespace-nowrap",
                item.href == pathName ? "bg-blue-100 dark:bg-[#162042]" : "",
              )}
              href={item.href}
              title={item.title}
            >
              <span className="[&>svg]:size-5">{item.icon}</span>
              <span className={cn(!isOpened ? "hidden" : "block")}>
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
