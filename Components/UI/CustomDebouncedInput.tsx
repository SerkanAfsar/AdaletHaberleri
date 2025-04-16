import React, { useEffect, useState } from "react";
import CustomInput, { CustomInputProps } from "./CustomInput";

export type CustomDebouncedInputProps = Omit<
  CustomInputProps,
  "onChange" | "value"
> & {
  delay?: number;
  onChange: (value: string | number) => void;
  value?: string | number | null;
};

const CustomDebouncedInput = React.forwardRef<
  React.ElementRef<typeof CustomInput>,
  CustomDebouncedInputProps
>(
  (
    {
      onChange: customChange,
      delay = 1000,
      className,
      value: initialValue,
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useState<string | number>(initialValue ?? "");

    useEffect(() => {
      const timer = setTimeout(() => {
        customChange(value);
      }, delay);
      return () => clearTimeout(timer);
    }, [value]);

    return (
      <CustomInput
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...rest}
      />
    );
  },
);
export default CustomDebouncedInput;
