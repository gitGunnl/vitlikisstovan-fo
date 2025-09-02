import React from "react";

export function ShinyButton({
  as = "button",
  className = "",
  children,
  ...rest
}: React.ComponentProps<"button"> & { as?: "a" | "button" }) {
  const Comp: any = as;
  return (
    <Comp
      className={
        "shiny-btn inline-flex items-center justify-center rounded-full px-5 py-3 font-medium " +
        "bg-primary text-primary-foreground shadow-md hover:shadow-lg transition " +
        className
      }
      {...rest}
    >
      {children}
    </Comp>
  );
}