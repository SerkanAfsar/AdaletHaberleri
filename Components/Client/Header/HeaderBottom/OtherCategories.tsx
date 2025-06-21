"use client";
import { generateCategoryUrl } from "@/Utils";
import { Category } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function OtherCategories({ data }: { data: Category[] }) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpened(false);
  }, [pathName]);
  return (
    <>
      <Menu
        className="cursor-pointer"
        onClick={() => setIsOpened((prev) => !prev)}
      />
      {isOpened && (
        <div className="absolute inset-0 top-[100%] container text-black">
          <ul className="grid w-full grid-cols-5 gap-3 bg-white p-4 shadow">
            {data.map((category: Category) => (
              <li key={category.id}>
                <Link
                  title={`${category.categoryName} Haberleri`}
                  href={generateCategoryUrl(category.categoryName, category.id)}
                  className="block p-3 first:px-0"
                >
                  {category.categoryName} Haberleri
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
