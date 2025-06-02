"use client";
import { useFormStatus } from "react-dom";

export default function CustomSubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit">{pending ? "Loading..." : "Load"}</button>;
}
