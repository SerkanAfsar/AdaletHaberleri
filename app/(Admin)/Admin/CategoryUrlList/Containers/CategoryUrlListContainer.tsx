"use client";
import CustomDataTable from "@/Components/Admin/CustomDatatable";
import EditCell from "@/Components/Admin/CustomDatatable/EditCell";
import { Category, CategorySourceUrl } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import AddCategoryUrlModalComponent from "../Components/AddCategoryUrlModalComponent";
import { SourceList } from "@/Data/Admin.data";

export type CategoryUrlListType = CategorySourceUrl & {
  category: Category;
};

export default function CategoryUrlListContainer() {
  const cols = useMemo<ColumnDef<CategoryUrlListType>[]>(
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
        accessorKey: "sourceUrl",
        header: "Source url",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("sourceUrl")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "source",
        header: "KAYNAK",
        cell: ({ row }) => (
          <div className="capitalize">
            {SourceList[row.getValue("source") as string]}
          </div>
        ),
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "category.categoryName",
        header: "Kategori",
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
      },

      {
        id: "actions",
        enableHiding: false,
        header: "İşlemler",
        cell: (cellContext) => (
          <EditCell
            cellContext={cellContext}
            fetchUrl="/api/categoryurl"
            // ModalComponent={}
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
      AddModalComponent={AddCategoryUrlModalComponent}
      fetchUrl="/api/categoryurl"
      title="Kategori Url"
    />
  );
}
