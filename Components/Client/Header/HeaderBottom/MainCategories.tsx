import { generateCategoryUrl } from "@/Utils";
import { Category } from "@prisma/client";
import Link from "next/link";

export default function MainCategories({ data }: { data: Category[] }) {
  return (
    <ul className="hidden gap-3 lg:flex">
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
