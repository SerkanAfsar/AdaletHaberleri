import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React, { useState } from "react";

import useGetCustomDatatableData from "@/Hooks/useGetCustomDatatableData";
import { DataTableProps } from "@/Types";

export default function CustomDataTable<T extends object>({
  columns,
  fetchUrl,
}: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data, isError, rowCount, isLoading, errMessage } =
    useGetCustomDatatableData<T>({
      columnFilters,
      fetchUrl,
      globalFilter,
      pagination,
      sorting,
      //   isChanged: isUpdated,
    });

  const table = useReactTable({
    data,
    columns,
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
    // meta: {
    //   deleteFunc: async (id: number) => {
    //     await deleteApi({ id, setIsUpdated });
    //   },
    //   getByIdFunc: async (id: number) => {
    //     return await getByIdApi(id);
    //   },
    //   setIsUpdated,
    // },
  });

  //   if (isError) {
  //     return (
  //       <Alert>
  //         <Terminal className="h-4 w-4" />
  //         <AlertTitle>Hata!</AlertTitle>
  //         <AlertDescription>{errMessage}</AlertDescription>
  //       </Alert>
  //     );
  //   }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{errMessage}</div>;
  }

  return (
    <table className="dark:bg-dark-table w-full table-auto border-collapse rounded-md border border-gray-400">
      <thead>
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <th
                key={header.id}
                className="border border-gray-300 p-3 text-left dark:border-white/[0.05]"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="border border-gray-300 p-3 text-left dark:border-white/[0.05]"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
