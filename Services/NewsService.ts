import { SourceList } from "@/Data/Admin.data";
import { CloudFlareResponseType, SiteSelectors } from "@/Types";
import { getImageTypeFromPath, slugUrl } from "@/Utils";
import prisma from "@/Utils/db";
import { CategorySourceUrl } from "@prisma/client";
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
    await getNewsList(categoryList[i].CategorySourceUrl, categoryList[i].id);
  }

  return categoryList;
};

const getNewsList = async (
  sourceList: CategorySourceUrl[],
  categoryId: number,
) => {
  for (let k = 0; k < sourceList.length; k++) {
    const source = sourceList[k];

    const root = await fetchPageData(source.sourceUrl);
    if (!root) {
      return;
    }

    const sourceSelector = SourceList[source.source];
    const allTitles = root.querySelectorAll(sourceSelector.newsListSelector);
    allTitles.reverse().forEach(async (item) => {
      const hrefValue = item.getAttribute("href");
      if (hrefValue) {
        await registerNewsToDb(
          item.innerText,
          hrefValue,
          categoryId,
          sourceSelector,
        );
      }
    });
  }
};

const registerNewsToDb = async (
  title: string,
  hrefValue: string,
  categoryId: number,
  selector: SiteSelectors,
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

  const fetchUrl = `${selector.baseUrl}${hrefValue}`;
  const root = await fetchPageData(fetchUrl);
  if (!root) {
    return;
  }
  const titleItem = root.querySelector(selector.titleSelector);
  const descriptionItem = root.querySelector(selector.subDescriptionSelector);
  const articleBodyItem = root.querySelector(selector.contentSelector);
  const reklamAlani = root.querySelector(selector.advertisementSelector);
  const imgAlani = root.querySelector(selector.imageSelector);

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
      source: selector.source,
      sourceUrlLink: fetchUrl,
      imageId: imgAlani?.getAttribute("src")
        ? await uploadImage(title.trim(), imgAlani.getAttribute("src") ?? "")
        : null,
      categoryId,
    },
  });
};

async function uploadImage(title: string, imagePath: string) {
  if (!imagePath) {
    return null;
  }

  const imageFetchResponse = await fetch(imagePath);
  if (!imageFetchResponse.ok) {
    return null;
  }

  const type = getImageTypeFromPath(imagePath);
  const result = await imageFetchResponse.blob();
  const form = new FormData();
  const file = new File([result], `${slugUrl(title)}.${type}`, { type: type });
  form.append("file", file);
  form.append("requireSignedURLs", "false");

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CDN_ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN}`,
      },
      body: form,
    },
  );

  if (response.ok) {
    const data: CloudFlareResponseType = await response.json();
    if (!data.success) {
      return null;
    }
    return data.result.id;
  }
  return null;
}

export const fetchPageData = async (url: string) => {
  try {
    const response = await fetch(url);
    const result = await response.text();
    return parse(result);
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};
