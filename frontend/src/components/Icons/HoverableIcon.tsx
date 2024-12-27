import React, { HTMLAttributes } from "react";

export const HoverableIcon: React.FC<
  {
    children: React.ReactNode;
    color?: "primary" | "secondary";
  } & HTMLAttributes<HTMLDivElement>
> = ({ children, className, color = "primary", ...props }) => {
  const colorClass = {
    primary: "hover:text-purple-600",
    secondary: "hover:text-yellow-500",
  }[color];

  return (
    <div
      {...props}
      className={`transition-colors duration-150 ease-in-out cursor-pointer ${colorClass} ${className}`}
    >
      {children}
    </div>
  );
};
