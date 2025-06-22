"use server";
import { LoginType } from "@/Types";
import { redirect } from "next/navigation";
import { AdminUrlList, Users } from "@/Data/Admin.data";
import { revalidatePath, revalidateTag } from "next/cache";
import { createSession, deleteSession } from "@/Utils/session";
export const createToken = async (previousData: any, data: LoginType) => {
  const user = Users.find(
    (a) => a.email == data.email && a.password == data.password,
  );
  if (!user) {
    return { message: "Kullanıcı Bulunamadı", success: false };
  }
  await createSession(user.email);

  redirect(AdminUrlList.Dashboard);
};

export async function revalidateCustomPath(path: string = "/") {
  revalidatePath(path);
}

export async function revalidateCustomTags(tags: string[]) {
  for (const tag of tags) {
    revalidateTag(`${tag}`);
  }
}

export async function ExitPanel() {
  await deleteSession();
  redirect("/Admin");
}
