import { generateCategoryUrl } from "@/Utils";
import { Category } from "@prisma/client";
import Link from "next/link";

export default function MainCategories({ data }: { data: Category[] }) {
  return (
    <ul className="hidden gap-3 lg:flex">
      <li>
        <Link
          title={"Adalet Haberleri"}
          href={"/"}
          className="block p-3 first:px-0"
        >
          Anasayfa
        </Link>
      </li>
      {data.map((category: Category) => (
        <li key={category.id}>
          <Link
            title={`${category.categoryName} Haberleri`}
            href={generateCategoryUrl(category.categoryName, category.id)}
            className="block p-3 first:px-0"
          >
            {category.categoryName}
          </Link>
        </li>
      ))}
    </ul>
  );
}
