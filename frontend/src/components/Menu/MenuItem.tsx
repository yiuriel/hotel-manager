import React from "react";

export const MenuItem = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    color?: "primary" | "secondary";
  }
>(({ children, onClick, className, color = "primary" }, ref) => {
  const colorClass = {
    primary: "hover:bg-purple-100 hover:bg-opacity-30",
    secondary: "hover:bg-yellow-100 hover:bg-opacity-30",
  }[color];

  return (
    <div
      ref={ref}
      className={`px-2 font-thin rounded-sm cursor-pointer transition-colors duration-150 ease-in-out ${colorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
});
