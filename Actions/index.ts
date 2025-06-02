"use server";
import { LoginType } from "@/Types";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { AdminUrlList, Users } from "@/Data/Admin.data";

export const createToken = async (data: LoginType) => {
  const user = Users.find(
    (a) => a.email == data.email && a.password == data.password,
  );

  if (!user) {
    return "Kullanıcı Bulunamadı";
  }

  const token = jwt.sign(user, process.env.NEXT_PUBLIC_TOKEN!, {
    expiresIn: "1d",
  });

  const cookieStore = await cookies();
  cookieStore.set("adaletHaberleri", token);
  return redirect(AdminUrlList.Dashboard);
};
