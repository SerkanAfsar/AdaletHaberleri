import { cn } from "@/Utils";
import React from "react";

export type CustomInputProps = {
  title?: string;
  icon?: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    { className, value, title, error, onBlur, onChange, icon, ...rest },
    ref,
  ) => {
    return (
      <div className="relative block">
        {title && <b className="mb-2 block w-full">{title}</b>}
        <div className="relative block w-full">
          {icon && (
            <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center [&>svg]:size-5 [&>svg]:text-gray-500">
              {icon}
            </div>
          )}
          <input
            type="text"
            ref={ref}
            className={cn(
              "dark:focus:border-brand-800 flex w-full rounded border border-gray-400 px-3 py-2 text-sm text-black outline-none placeholder:text-gray-400 disabled:bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30",
              className,
              icon && "pl-10",
              error && "border-red-500",
            )}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            {...rest}
          />
        </div>
        {error && (
          <span className="mt-1 block w-full text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  },
);
CustomInput.displayName = "CustomTextBox";

export default CustomInput;
