import { cn } from "@/Utils";
import React from "react";

export type CustomTextBoxProps = {
  title?: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomTextBox = React.forwardRef<HTMLInputElement, CustomTextBoxProps>(
  ({ className, icon, ...rest }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center [&>svg]:size-5 [&>svg]:text-gray-500">
            {icon}
          </div>
        )}
        <input
          type="text"
          {...rest}
          ref={ref}
          className={cn(
            "flex rounded border border-gray-400 px-3 py-2 text-sm text-black placeholder:text-gray-400",
            className,
            icon && "pl-10",
          )}
        />
      </div>
    );
  },
);
CustomTextBox.displayName = "CustomTextBox";

export default CustomTextBox;
