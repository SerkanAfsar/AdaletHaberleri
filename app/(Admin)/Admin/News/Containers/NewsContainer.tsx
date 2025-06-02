"use client";
import CustomDataTable from "@/Components/Admin/CustomDatatable";
import EditCell from "@/Components/Admin/CustomDatatable/EditCell";
import { ImageUrlType } from "@/Types";
import { Category, News } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useMemo } from "react";

import { AdminUrlList } from "@/Data/Admin.data";

export type NewsListType = Partial<News> & {
  Category: Category;
};
export default function NewsContainer() {
  const cols = useMemo<ColumnDef<NewsListType>[]>(
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
        accessorKey: "title",
        header: "Haber Başlık",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("title")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
        meta: {
          width: 500,
        },
      },

      {
        accessorKey: "imageId",
        header: "Resim",
        cell: ({ row }) => {
          const imageId = row.original.imageId;
          const url: ImageUrlType = {
            large: `https://imagedelivery.net/${process.env.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Big`,
            medium: `https://imagedelivery.net/${process.env.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Medium`,
            small: `https://imagedelivery.net/${process.env.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Small`,
          };

          return (
            <Image src={url.small} width={200} height={150} alt="Deneme" />
          );
        },
        enableSorting: false,
        enableHiding: true,
        enableGlobalFilter: true,
        meta: {
          width: 200,
        },
      },
      {
        accessorKey: "Category.categoryName",
        header: "Kategori",
        enableSorting: false,
        enableHiding: true,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "readedCount",
        header: "Okunma Sayısı",
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: false,
      },

      {
        id: "actions",
        enableHiding: false,
        header: "İşlemler",
        cell: (cellContext) => (
          <EditCell
            cellContext={cellContext}
            forceId={true}
            forceIdUrl={AdminUrlList.HaberEkle}
            fetchUrl={"/api/news"}
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
      fetchUrl="/api/news"
      title="Haber"
      addUrl={AdminUrlList.HaberEkle}
    />
  );
}
