import { CategoryLinkType } from "@/Types/Client.types";
import { generateCategoryUrl } from "@/Utils";
import Link from "next/link";

export default function CategoryMenuItem({ item }: { item: CategoryLinkType }) {
  return (
    <Link
      href={generateCategoryUrl(item.categoryName!, item.id!)}
      title={`${item.categoryName} Haberleri`}
    >
      {item.categoryName} Haberleri
    </Link>
  );
}
