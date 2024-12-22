import React, { HTMLAttributes } from "react";

export const HoverableIcon: React.FC<
  { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="hover:text-purple-600 transition-colors duration-150 ease-in-out cursor-pointer"
    >
      {children}
    </div>
  );
};
