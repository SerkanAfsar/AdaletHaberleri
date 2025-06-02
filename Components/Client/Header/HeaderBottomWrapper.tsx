"use client";
import { cn } from "@/Utils";

export default function HeaderBottomWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={cn("block w-full")}>{children}</div>;
}
