"use client";
import { createToken } from "@/Actions";
import { useForm } from "react-hook-form";

import { useState } from "react";
import CustomInput from "@/Components/UI/CustomInput";
import { LoginType } from "@/Types";

export default function Page() {
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();
  const action: () => void = handleSubmit(async (data) => {
    const response = await createToken(data);
    setServerResponse(response);
  });
  return (
    <form action={action} className="flex flex-col items-center space-y-2">
      <CustomInput
        placeholder="First Name"
        {...register("email", {
          required: "Deneme",
        })}
        error={errors.email?.message}
      />
      <CustomInput
        placeholder="Last Name"
        {...register("password", {
          required: "Deneme 2",
        })}
        error={errors.password?.message}
      />

      <button
        className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white"
        type="submit"
      >
        Confirm
      </button>
      {serverResponse && serverResponse}
    </form>
  );
}
