import { Category, News } from "@prisma/client";

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

export type CategoryWithNewsType = NullableType<
  Pick<
    Category,
    "id" | "seoTitle" | "seoDescription" | "id" | "categoryName" | "slugUrl"
  >
> & {
  Newses: NullableType<
    Pick<News, "title" | "imageId" | "subDescription" | "createdAt" | "id">[]
  >;
};

export type CategoryLinkType = NullableType<
  Pick<Category, "id" | "categoryName">
>;

export type NewsLinkType = NullableType<
  Pick<News, "id" | "title" | "imageId"> & {
    categoryName: string;
  }
>;

export type HeaderMiddleLinkType = {
  categoryName: string;
  Data: (NewsLinkType | CategoryLinkType)[];
  type: "News" | "List";
};

export type NullableType<T> = {
  [P in keyof T]: T[P] | null;
};
