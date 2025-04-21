import React, { useEffect, useRef, useState } from "react";
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

    const timeoutRef = useRef<any>(null);

    useEffect(() => {
      setValue(initialValue as string);
    }, [initialValue]);

    const handleChange = (e: any) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        customChange(newValue);
      }, delay);
    };

    return (
      <CustomInput
        ref={ref}
        value={value}
        onChange={(e) => handleChange(e)}
        {...rest}
      />
    );
  },
);
export default CustomDebouncedInput;
