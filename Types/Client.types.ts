import { News } from "@prisma/client";

export type CategoryNewsListSingleItemType = Pick<
  News,
  "title" | "subDescription" | "imageId" | "createdAt" | "id"
> & {
  categoryName: string;
  type?: "big" | "small";
};

export type FooterLinkItemType = {
  url: string;
  linkTitle: string;
};

export type LastNewsPickType = Pick<News, "title" | "imageId" | "id"> & {
  categoryName: string;
};
