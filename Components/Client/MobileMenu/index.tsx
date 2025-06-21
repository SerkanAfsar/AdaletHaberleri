import MobileMenuWrapper from "./MobileMenuWrapper";
import { GetAllCategoriesCacheService } from "@/Caches/Category.CacheService";
import { Category } from "@prisma/client";

export default async function MobileMenu() {
  const result = await GetAllCategoriesCacheService();
  if (!result.success) {
    return <div>{result.message}</div>;
  }
  return <MobileMenuWrapper list={result.data as Category[]} />;
}
