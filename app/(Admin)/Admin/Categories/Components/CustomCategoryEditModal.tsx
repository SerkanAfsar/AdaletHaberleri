import CustomInput from "@/Components/UI/CustomInput";
import { ModalComponentType, ResponseResult } from "@/Types";
import { slugUrl } from "@/Utils";
import { Category } from "@prisma/client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CustomCategoryEditModal({
  item,
  setItem,
  setIsUpdated,
}: ModalComponentType<Category>) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Category>({ defaultValues: item });

  const categoryName = watch("categoryName");

  useEffect(() => {
    setValue("slugUrl", slugUrl(categoryName));
  }, [categoryName, setValue]);

  const onSubmit: SubmitHandler<Category> = async (data) => {
    const response = await fetch(`/api/categories/${item?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    const result: ResponseResult<Category> = await response.json();
    if (result.success) {
      if (setItem) {
        setItem(undefined);
      }
      setIsUpdated((prev) => !prev);
      return toast.success("Güncelleme Başarılı", { position: "top-right" });
    } else {
      return toast.error(result.error, { position: "top-right" });
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black/40">
      <div className="relative block min-h-1/2 w-1/2 rounded-md bg-white p-3 text-black shadow">
        <div
          onClick={() => {
            if (setItem) {
              setItem(undefined);
            }
          }}
          className="absolute top-0 right-0 flex size-8 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black font-bold text-white"
        >
          X
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            title="Kategori Adı"
            {...register("categoryName", { required: "Kategori Adı Giriniz" })}
            error={errors.categoryName?.message}
          />
          <CustomInput
            title="Seo Title"
            {...register("seoTitle", {
              required: "Seo Title Giriniz",
            })}
            error={errors.seoTitle?.message}
          />
          <CustomInput
            title="Seo Description"
            {...register("seoDescription", {
              required: "Seo Description Giriniz",
            })}
            error={errors.seoDescription?.message}
          />
          <CustomInput title="SlugUrl" disabled {...register("slugUrl")} />

          <button
            className="cursor-pointer self-end rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}
