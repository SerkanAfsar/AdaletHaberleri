"use client";
import { createToken } from "@/Actions";
import { useForm } from "react-hook-form";
import { startTransition, useActionState } from "react";
import CustomInput from "@/Components/UI/CustomInput";
import { LoginType } from "@/Types";

export default function Page() {
  const [state, action, isPending] = useActionState(createToken, null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const customAction: () => void = handleSubmit((data) => {
    startTransition(() => {
      action(data);
    });
  });

  return (
    <section className="m-0 flex h-full min-h-screen w-full items-center justify-center bg-[url('/adminbg.jpeg')] bg-cover bg-center p-0">
      <form
        action={customAction}
        className="flex w-sm max-w-xl flex-col items-stretch gap-3 rounded-md bg-white p-6 shadow"
      >
        <h1 className="text-center text-xl leading-8">
          <b>Adalet Haberleri</b>
          <br /> Yönetim Giriş
        </h1>
        <CustomInput
          title="Kullanıcı Adı"
          className="w-full"
          placeholder="Kullanıcı Adı..."
          {...register("email", {
            required: "Deneme",
          })}
          error={errors.email?.message}
        />
        <CustomInput
          title="Şifre"
          placeholder="Şifre..."
          {...register("password", {
            required: "Deneme 2",
          })}
          error={errors.password?.message}
        />

        <button
          className="bg-primary cursor-pointer rounded-lg px-5 py-2.5 text-sm font-medium text-white"
          type="submit"
        >
          {isPending ? "Giriş Yapılıyor..." : "Giriş"}
        </button>

        {state && state.success == false && (
          <b className="self-end font-bold text-red-500">{state.message}</b>
        )}
      </form>
    </section>
  );
}
