"use client";

import CustomDebouncedInput from "@/Components/UI/CustomDebouncedInput";
import { useState } from "react";

export default function Page() {
  const [value, setValue] = useState<string>("serkan afşar");
  console.log(value);

  return (
    <div className="text-black">
      {value}
      <br />
      <CustomDebouncedInput
        onChange={(val) => setValue(val as string)}
        value={value}
      />
    </div>
  );
}
