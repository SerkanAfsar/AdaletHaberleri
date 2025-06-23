import dynamic from "next/dynamic";

import { Category } from "@prisma/client";
import { GetAllCategoriesListService } from "@/Services";
const MobileMenuWrapper = dynamic(() => import("./MobileMenuWrapper"));

export default async function MobileMenu() {
  const result = await GetAllCategoriesListService();
  if (!result.success) {
    return <div>{result.message}</div>;
  }
  return <MobileMenuWrapper list={result.data as Category[]} />;
}
