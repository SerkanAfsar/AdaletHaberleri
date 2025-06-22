"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { envVariables } from ".";

const secretKey = envVariables.NEXT_PUBLIC_TOKEN;
const encodedSecretKet = new TextEncoder().encode(secretKey);

export type SessionType = {
  expiresAt: Date;
  userId: string;
};

export async function ecdodeAsync(payload: SessionType) {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecretKet);
}

export async function decodeAsync(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedSecretKet, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7);
  const session = await ecdodeAsync({
    expiresAt,
    userId,
  });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires: expiresAt,
    httpOnly: true,
    secure: true,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
