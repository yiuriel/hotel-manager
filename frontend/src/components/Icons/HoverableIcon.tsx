import React from "react";

export const HoverableIcon: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="hover:text-purple-600 transition-colors duration-150 ease-in-out">
      {children}
    </div>
  );
};
