import { cn } from "@/Utils";
import React from "react";

export type CustomInputProps = {
  title?: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, value, onChange, icon, ...rest }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center [&>svg]:size-5 [&>svg]:text-gray-500">
            {icon}
          </div>
        )}
        <input
          type="text"
          ref={ref}
          className={cn(
            "dark:focus:border-brand-800 flex rounded border border-gray-400 px-3 py-2 text-sm text-black outline-none placeholder:text-gray-400 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30",
            className,
            icon && "pl-10",
          )}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>
    );
  },
);
CustomInput.displayName = "CustomTextBox";

export default CustomInput;
