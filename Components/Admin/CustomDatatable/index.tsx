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
import CustomDebouncedInput from "@/Components/UI/CustomDebouncedInput";
import { Search, SortAsc, SortDesc } from "lucide-react";
import ReactPaginate from "react-paginate";
import { cn } from "@/Utils";
import { useRouter } from "next/navigation";

export default function CustomDataTable<T extends object>({
  columns,
  fetchUrl,
  AddModalComponent,
  title,
  metaData,
  addUrl,
}: DataTableProps<T>) {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [addModalOpened, setAddModalOpened] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
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
      isChanged,
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
    meta: {
      ...metaData,
      setIsUpdated: () => {
        setIsChanged(!isChanged);
      },
    },
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

  if (isError) {
    return <div>{errMessage}</div>;
  }

  return (
    <>
      {addModalOpened && AddModalComponent && (
        <AddModalComponent
          setIsUpdated={setIsChanged}
          setIsOpened={setAddModalOpened}
          metaData={table.options.meta!}
        />
      )}

      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full items-end justify-between gap-3">
          <div className="flex items-center justify-center gap-3">
            <b>Gösterim</b>
            <select
              className="min-w-20 rounded-md border border-gray-400 px-3 py-2"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              className="w-full cursor-pointer rounded-md bg-blue-500 p-2 text-white dark:bg-blue-900"
              onClick={() =>
                AddModalComponent
                  ? setAddModalOpened(true)
                  : router.push(addUrl!)
              }
            >
              Yeni {title} Ekle
            </button>
            <CustomDebouncedInput
              className="inline-flex w-40 self-end"
              icon={<Search />}
              placeholder="Arama Yapınız"
              value={globalFilter}
              onChange={(val) => {
                table.setGlobalFilter(val);
                table.setPageIndex(0);
              }}
            />
          </div>
        </div>
        <table className="dark:bg-dark-table w-full table-auto border-collapse rounded-md border border-gray-400">
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      onClick={header.column.getToggleSortingHandler()}
                      key={header.id}
                      className={cn(
                        "border border-gray-300 p-3 text-left dark:border-white/[0.05]",
                        header.column.getCanSort() && "cursor-pointer",
                      )}
                      style={{ width: header.column.columnDef.meta?.width }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      <span className="ml-1 inline-block">
                        {isSorted === "asc" && <SortAsc size={15} />}
                        {isSorted === "desc" && <SortDesc size={15} />}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {isLoading ? (
            <TableLoadingSkeleton
              rows={10}
              columns={table.getAllColumns().length}
            />
          ) : (
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-gray-300 p-3 text-left dark:border-white/[0.05]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <TableFooter
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          totalCount={rowCount}
        />
        <ReactPaginate
          breakLabel="..."
          nextLabel="Sonraki >"
          onPageChange={(e) => table.setPageIndex(Number(e.selected))}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(
            Number(rowCount) / Number(table.getState().pagination.pageSize),
          )}
          forcePage={table.getState().pagination.pageIndex}
          previousLabel="< Önceki"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-end text-sm space-x-2"
          pageClassName=" border border-gray-300 w-auto cursor-pointer text-center rounded-md "
          activeClassName="bg-black text-white"
          pageLinkClassName="block w-full h-full  px-3 py-2"
          previousClassName="bg-gray-100 dark:bg-black dark:hover:bg-inherit cursor-pointer border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-200 transition"
          nextClassName="bg-gray-100 dark:bg-black border border-gray-300 dark:hover:bg-inherit rounded-md px-3 py-2 hover:bg-gray-200 transition"
          nextLinkClassName="block cursor-pointer w-full h-full"
          breakClassName="px-3 py-2"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </>
  );
}

const TableLoadingSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {[...Array(columns)].map((_, colIndex) => (
            <td key={colIndex} className="p-4">
              <div className="h-4 w-full rounded bg-gray-300"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const TableFooter = ({
  pageIndex,
  pageSize,
  totalCount,
}: {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}) => {
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="p-2 text-sm text-gray-600">
      Gösterim {start}–{end} Toplam {totalCount} Kayıt
    </div>
  );
};
