"use client";

import CustomDataTable from "@/Components/Admin/CustomDatatable";
import EditCell from "@/Components/Admin/CustomDatatable/EditCell";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import CustomCategoryEditModal from "../Components/CustomCategoryEditModal";
import AddCategoryModalComponent from "../Components/AddCategoryModalComponent";

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
        meta: {
          width: 80,
        },
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
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: false,
        enableColumnFilter: false,
      },

      {
        id: "actions",
        enableHiding: false,
        header: "İşlemler",
        cell: (cellContext) => (
          <EditCell
            cellContext={cellContext}
            fetchUrl="/api/categories"
            ModalComponent={CustomCategoryEditModal}
          />
        ),
        meta: {
          width: 90,
        },
        enableGlobalFilter: false,
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [],
  );

  return (
    <CustomDataTable
      columns={cols}
      AddModalComponent={AddCategoryModalComponent}
      fetchUrl="/api/categories"
      title="Kategori"
    />
  );
}
