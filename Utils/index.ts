import {
  CustomOptionType,
  EnvType,
  ImageUrlType,
  ResponseResult,
  UserType,
} from "@/Types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { tr } from "date-fns/locale";
import adaletHaberleriImg from "../public/adalethaberleri.webp";

import { JWTPayload, jwtVerify } from "jose";
import { formatDistanceToNowStrict } from "date-fns";
import { StaticImageData } from "next/image";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export function errorHandler<T>(err: unknown) {
  const responseResult: ResponseResult<T> = {
    data: null,
    error: null,
    statusCode: 400,
    success: false,
    totalCount: 0,
  };
  if (err instanceof Error) {
    responseResult.error = err.message;
  } else if (typeof err == "string") {
    responseResult.error = err;
  } else {
    responseResult.error = "Something went wrong";
  }
  return responseResult;
}

export const slugUrl = (value: string): string => {
  if (value) {
    value = value.replace("'", "-");
    return value
      .toLowerCase()
      .normalize("NFD") // ü -> u + ¨
      .replace("'", "-")
      .replace(/&#039;/g, "")
      .replace(/&039;/g, "")
      .replace(/['"]/g, "")
      .replace(/[\u0300-\u036f]/g, "") // ¨ gibi işaretleri sil
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/[’‘“”'"`´]/g, "") // tüm tırnak çeşitlerini kaldır
      .replace(/[^a-z0-9\s-]/g, "") // harf, sayı, boşluk ve tire dışındakileri sil
      .replace(/\s+/g, "-") // boşlukları - yap
      .replace(/-+/g, "-") // birden fazla - varsa sadeleştir
      .replace(/^-+|-+$/g, ""); // baş/son tireleri sil
  }
  return "";
};

export const checkIfCategoryNameExists = async (value: string) => {
  const entity = await prisma.category.findFirst({
    where: {
      categoryName: {
        equals: value,
        // mode: "insensitive",
      },
    },
  });
  return !!entity;
};

export const ConvertToCustomOptions = <
  T extends object,
  KeyField extends keyof T,
  ValueField extends keyof T,
>(
  data: T[],
  fieldOne: KeyField,
  fieldTwo: ValueField,
): CustomOptionType[] => {
  return data.map((item) => ({
    title: item[fieldOne] as string,
    value: item[fieldTwo] as string,
  }));
};

export const getImageTypeFromPath = (path: string) => {
  const match = path.match(/\.(\w+)(?:\?.*)?$/);
  return match ? match[1].toLowerCase() : "jpeg";
};

export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN!);
    const { payload } = await jwtVerify(token, secret);
    const result = payload as JWTPayload & UserType;
    return result.role;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const GetImageUrlCdn = (
  path: string | null,
): ImageUrlType | StaticImageData => {
  if (path) {
    return {
      small: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${path}/Small`,
      medium: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${path}/Medium`,
      large: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${path}/Big`,
      ExtraLarge: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${path}/ExtraLarge`,
    } as ImageUrlType;
  }
  return adaletHaberleriImg;
};

export const convertType = <
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T,
>(
  data: T[],
  titleOne: string,
  keyFieldOne: K1,
  titleTwo: string,
  keyFieldTwo: K2,
) => {
  return data.map((item) => ({
    [titleOne]: item[keyFieldOne],
    [titleTwo]: item[keyFieldTwo],
  }));
};

export const dateFormat = (date: Date) => {
  return formatDistanceToNowStrict(date, { locale: tr, addSuffix: true });
};

export const generateNewsUrl = (
  categoryName: string,
  title: string,
  id: number,
): string => {
  return `/haberler/${slugUrl(categoryName)}/${slugUrl(title)}/${id}`;
};

export const sharpString = (val: string, lenght: number) => {
  if (val.length > lenght) {
    return val.substring(0, lenght) + "...";
  }
  return val;
};

export const generateCategoryUrl = (
  categoryName: string,
  categoryId: number,
): string => {
  return `/kategori/${slugUrl(categoryName)}/${categoryId}`;
};

export const CacheNames = {
  CategoryList: "CategoryList",
  HeaderBottomCategoryList: "HeaderBottomCategoryList",
  LastSectionNews: "LastSectionNews",
  MenuList: "MenuList",
  LastFiveNews: "LastFiveNews",
} as const;

export const envVariables: EnvType = {
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXT_PUBLIC_ACCOUNT_KEY: process.env.NEXT_PUBLIC_ACCOUNT_KEY!,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
  NEXT_PUBLIC_CDN_ACCOUNT_ID: process.env.NEXT_PUBLIC_CDN_ACCOUNT_ID!,
  NEXT_PUBLIC_CDN_ACCOUNT_TOKEN: process.env.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN!,
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL!,
  NEXT_PUBLIC_PAGINATION_ITEM_COUNT: Number(
    process.env.NEXT_PUBLIC_PAGINATION_ITEM_COUNT!,
  ),
  NEXT_PUBLIC_PASSWORD: process.env.NEXT_PUBLIC_PASSWORD!,
  NEXT_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_TOKEN!,
};
