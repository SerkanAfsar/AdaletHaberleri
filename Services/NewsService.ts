import { slugUrl } from "@/Utils";
import prisma from "@/Utils/db";
import { parse } from "node-html-parser";

export const GetCategoryNewsListWithCategorySources = async () => {
  const categoryList = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      CategorySourceUrl: true,
    },
  });
  for (let i = 0; i < categoryList.length; i++) {
    const category = categoryList[i];
    const sourceList = category.CategorySourceUrl;
    for (let k = 0; k < sourceList.length; k++) {
      const source = sourceList[k];
      await getHukukiNewsList(source.sourceUrl, category.id);
    }
  }

  return categoryList;
};

const getHukukiNewsList = async (url: string, categoryId: number) => {
  const response = await fetch(url);
  const result = await response.text();
  const root = parse(result);
  const allTitles = root.querySelectorAll(".card.border-0.h-100 a");
  allTitles.forEach(async (item) => {
    const hrefValue = item.getAttribute("href");
    if (hrefValue) {
      await registerHukukiNewsToDb(item.innerText, hrefValue, categoryId);
    }
  });
};

const registerHukukiNewsToDb = async (
  title: string,
  hrefValue: string,
  categoryId: number,
) => {
  if (!title || !title.trim()) {
    return false;
  }
  const entity = await prisma.news.findUnique({
    where: {
      title,
    },
  });

  if (entity) {
    return false;
  }
  const response = await fetch(`https://www.hukukihaber.net${hrefValue}`);
  const result = await response.text();

  const root = parse(result);
  const titleItem = root.querySelector('h1[itemprop="headline"]');
  const descriptionItem = root.querySelector('h2[itemprop="description"]');
  const articleBodyItem = root.querySelector("div[property='articleBody']");
  const reklamAlani = root.querySelector("div[data-pagespeed='true']");
  if (reklamAlani) {
    articleBodyItem?.removeChild(reklamAlani);
  }

  if (!titleItem?.innerText) {
    return false;
  }
  await prisma.news.create({
    data: {
      title: titleItem?.innerText,
      subDescription: descriptionItem?.innerText,
      content: articleBodyItem?.innerHTML,
      seoTitle: titleItem.innerText,
      seoDescription: titleItem.innerText,
      readedCount: 1,
      slugUrl: slugUrl(title)!,
      source: "HUKUKIHABER",
      categoryId,
    },
  });
};
