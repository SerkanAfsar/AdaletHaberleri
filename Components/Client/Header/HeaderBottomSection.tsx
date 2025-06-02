import prisma from "@/Utils/db";
import Link from "next/link";

export default async function HeaderBottomSection() {
  const categories = await prisma.category.findMany({ take: 8 });
  return (
    <section className="bg-primary block w-full text-sm text-white uppercase">
      <div className="container mx-auto">
        <ul className="hidden gap-3 lg:flex">
          {categories.slice(0, 10).map((category) => (
            <li key={category.id}>
              <Link href={"/"} className="block p-3 first:px-0">
                {category.categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
