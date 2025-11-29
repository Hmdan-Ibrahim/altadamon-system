import * as React from "react"

import { cn } from "@/src/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex px-4 py-2 h-9 w-full rounded-lg border border-border bg-transparent text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-transparent ",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input  min-w-0 rounded-mdbg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7     disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }
