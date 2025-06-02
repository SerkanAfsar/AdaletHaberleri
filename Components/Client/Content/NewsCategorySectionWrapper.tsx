import prisma from "@/Utils/db";
import NewsCategorySectionItem from "./NewsCategorySectionItem";

export default async function NewsCategorySectionWrapper() {
  const categories = await prisma.category.findMany({
    where: {
      Newses: {
        some: {},
      },
    },
    select: {
      categoryName: true,
      id: true,
      Newses: {
        select: {
          title: true,
          imageId: true,
          createdAt: true,
          subDescription: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      },
    },

    take: 5,
  });

  const sorted = categories.sort((a, b) => {
    const dateA = new Date(a.Newses[0]?.createdAt ?? 0);
    const dateB = new Date(b.Newses[0]?.createdAt ?? 0);
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <>
      {sorted.map((item: any, key: number) => (
        <NewsCategorySectionItem
          item={item}
          k1={"Newses"}
          k2="categoryName"
          key={key}
        />
      ))}
    </>
  );
}
