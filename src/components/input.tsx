import * as React from "react";
import { cn } from "@/lib/tailwind";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { startIcon?: React.ReactNode; endIcon?: React.ReactNode }
>(({ className, type, startIcon, endIcon, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}
    >
      {startIcon && <div className="mr-2">{startIcon}</div>}
      <input
        {...props}
        ref={ref}
        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      {endIcon && <div className="mr-2">{endIcon}</div>}
    </div>
  );
});
Input.displayName = "Input";

export type { InputProps };
export { Input };
