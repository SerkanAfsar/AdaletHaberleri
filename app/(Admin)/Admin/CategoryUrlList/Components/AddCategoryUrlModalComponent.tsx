import CustomInput from "@/Components/UI/CustomInput";
import { ModalComponentType, ResponseResult } from "@/Types";
import { checkIfCategoryNameExists, slugUrl } from "@/Utils";
import { Category, CategorySourceUrl } from "@prisma/client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryUrlListType } from "../Containers/CategoryUrlListContainer";
import CustomSelect from "@/Components/UI/CustomSelect";
import { SourceList } from "@/Data/Admin.data";

const fetchCategoryName = async (value: string): Promise<boolean> => {
  const response = await fetch(`/api/categories/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      value,
    }),
  });
  const result = await response.json();
  return result;
};
export default function AddCategoryUrlModalComponent({
  setIsUpdated,
  setIsOpened,
  metaData,
}: ModalComponentType<CategoryUrlListType>) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryUrlListType>({
    mode: "onChange",
  });

  const { customList } = metaData;

  // const categoryName = watch("categoryName");

  //   useEffect(() => {
  //     setValue("slugUrl", slugUrl(categoryName));
  //   }, [categoryName, setValue]);

  const onSubmit: SubmitHandler<CategorySourceUrl> = async (data) => {
    const response = await fetch(`/api/categoryurl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    const result: ResponseResult<CategorySourceUrl> = await response.json();
    if (result.success) {
      setIsOpened && setIsOpened(false);
      setIsUpdated((prev) => !prev);
      return toast.success(
        `${(result.data as CategorySourceUrl).sourceUrl} Eklendi`,
        { position: "top-right" },
      );
    } else {
      return toast.error(result.error, { position: "top-right" });
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black/40">
      <div className="relative block min-h-1/2 w-1/2 rounded-md bg-white p-3 text-black shadow">
        <div
          onClick={() => {
            if (setIsOpened) {
              setIsOpened(false);
            }
          }}
          className="absolute top-0 right-0 flex size-8 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black font-bold text-white"
        >
          X
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <CustomSelect
            title="Kategori"
            optionList={customList!}
            {...register("categoryId", {
              required: "Kategori Seçiniz",
              valueAsNumber: true,
            })}
            error={errors.categoryId?.message}
          ></CustomSelect>
          <CustomInput
            title="Kaynak Url"
            {...register("sourceUrl", {
              required: "Kaynak Url Giriniz",
              validate: async (value) => {
                // const taken = await fetchCategoryName(value);
                // return taken ? `${value} Kaynak Url  Mevcut` : true;
                return true;
              },
            })}
            error={errors.sourceUrl?.message}
          />
          <CustomSelect
            title="Kaynak"
            optionList={Object.keys(SourceList).map((item) => ({
              title: SourceList[item].name,
              value: item,
            }))}
            {...register("source", {
              required: "Kaynak Seçiniz",
            })}
            error={errors.source?.message}
          ></CustomSelect>
          {/* 
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
          <CustomInput title="SlugUrl" disabled {...register("slugUrl")} /> */}

          <button
            className="cursor-pointer self-end rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
}
