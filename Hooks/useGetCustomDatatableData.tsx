import { ResponseResult } from "@/Types";
import { envVariables } from "@/Utils";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";

export type CustomGetValuesType = {
  globalFilter: string;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  pagination: PaginationState;
  fetchUrl: string;
  isChanged?: boolean;
};

export default function useGetCustomDatatableData<T extends object>({
  columnFilters,
  globalFilter,
  pagination,
  sorting,
  fetchUrl,
  isChanged,
}: CustomGetValuesType) {
  const [data, setData] = useState<T[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(fetchUrl, envVariables.NEXT_PUBLIC_BASE_URL);
      url.searchParams.set(
        "offset",
        `${pagination.pageIndex * pagination.pageSize}`,
      );
      url.searchParams.set("count", `${pagination.pageSize}`);
      url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      url.searchParams.set("globalFilter", globalFilter ?? "");
      url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      try {
        setIsLoading(true);
        const response = await fetch(url.href);
        const result = (await response.json()) as ResponseResult<T>;
        if (result.success) {
          setData(result.data as T[]);
          setRowCount(result.totalCount as number);
        } else {
          setIsError(true);
          setErrMessage(result?.error as string);
        }
      } catch {
        setIsError(true);
        setErrMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    fetchUrl,
    isChanged,
  ]);
  return { data, isError, isLoading, rowCount, errMessage };
}
