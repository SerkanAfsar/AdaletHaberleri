import { File, Trash } from "lucide-react";
import React, { useCallback, useState } from "react";
import { EditCellType, ResponseResult } from "@/Types";
import { toast } from "react-toastify";
import { useTopLoader } from "nextjs-toploader";
import { useRouter } from "next/navigation";

export default function EditCell<T, V>({
  cellContext,
  fetchUrl,
  ModalComponent,
  forceId,
  forceIdUrl,
}: EditCellType<T, V>) {
  const router = useRouter();
  const loader = useTopLoader();
  const [item, setItem] = useState<T | undefined>(undefined);

  const { row, cell, column, getValue, renderValue, table } = cellContext;

  const { id } = cell.row.original as any;

  const { setIsUpdated } = table.options.meta as any;

  const handleClick = useCallback(async ({ id }: { id: number }) => {
    if (forceId) {
      router.push(`${forceIdUrl}/${id}`);
    }
    loader.start();
    const response = await fetch(`${fetchUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const result: ResponseResult<T> = await response.json();

    if (result.success) {
      setItem(result.data as T);
    } else {
      setItem(undefined);
      toast.error(result.error, { position: "top-right" });
    }
    loader.done();
  }, []);

  const handleDelete = useCallback(
    async ({ id }: { id: number }) => {
      const confirmMessage = confirm(
        "Seçili Veriyi Silmek İstediğinizden Emin misiniz?",
      );
      if (!confirmMessage) return;
      loader.start();
      const response = await fetch(`${fetchUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const result: ResponseResult<T> = await response.json();
      if (result.success) {
        setItem(undefined);
        setIsUpdated();

        toast.success(`Veri Silindi`, {
          position: "top-right",
        });
      } else {
        toast.error(result.error, { position: "top-right" });
      }
      loader.done();
    },
    [fetchUrl, loader, setIsUpdated],
  );

  return (
    <>
      <div className="flex h-full w-full items-center justify-center gap-3">
        <File
          size={20}
          className="cursor-pointer"
          onClick={async () => await handleClick({ id })}
        />
        <Trash
          size={20}
          className="cursor-pointer"
          onClick={async () => await handleDelete({ id })}
        />
      </div>
      {item && ModalComponent ? (
        <ModalComponent
          item={item}
          setItem={setItem}
          setIsUpdated={setIsUpdated}
          metaData={table.options.meta!}
        />
      ) : null}
    </>
  );
}
