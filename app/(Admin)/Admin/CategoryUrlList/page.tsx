import { GetAllCategoriesListService } from "@/Services";
import CategoryUrlListContainer from "./Containers/CategoryUrlListContainer";
import { ConvertToCustomOptions } from "@/Utils";
import { Category } from "@prisma/client";

export default async function Page() {
  const categoryResult = await GetAllCategoriesListService();
  if (!categoryResult.success) {
    return <div>{categoryResult.error}</div>;
  }
  const categoryList = ConvertToCustomOptions(
    categoryResult.data as Category[],
    "categoryName",
    "id",
  );
  return <CategoryUrlListContainer categoryList={categoryList} />;
}
