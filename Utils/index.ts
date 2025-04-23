import { CustomOptionType, ResponseResult } from "@/Types";
import { clsx, type ClassValue } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";
import prisma from "./db";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const errorHandler = (err: unknown) => {
  const responseResult: ResponseResult<any> = {
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
};

export const slugUrl = (value: string): string | null => {
  if (value) {
    return slugify(value, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "tr", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
  }
  return null;
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
