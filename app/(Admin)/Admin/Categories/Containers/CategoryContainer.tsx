"use client";

import CustomDataTable from "@/Components/Admin/CustomDatatable";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export default function CategoryContainer() {
  const cols = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("id")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "categoryName",
        header: "Kategori Adı",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("categoryName")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "slugUrl",
        header: "Seo Url",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("slugUrl")}</div>
        ),
        enableSorting: false,
        enableHiding: true,
        enableGlobalFilter: false,
        enableColumnFilter: false,
      },

      {
        id: "actions",
        enableHiding: false,
        header: "İşlemler",
        //   cell: ({ row, table }) =>
        //     EditCell({
        //       row,
        //       table,
        //       EditModal: CategoryEdit,
        //       DeleteModal: CategoryDelete,
        //     }),
        enableGlobalFilter: false,
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [],
  );
  return <CustomDataTable columns={cols} fetchUrl="/api/categories" />;
}
