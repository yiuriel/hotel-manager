import React from "react";

interface TruncatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({
  children,
  className,
}) => {
  return <div className={`truncate ${className || ""}`}>{children}</div>;
};
