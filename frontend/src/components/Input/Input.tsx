export const Input = ({
  className,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  ...props
}: {
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<"input">) => {
  const variantClass = {
    contained: "border border-purple-300",
    outlined: "border-0",
  }[variant];

  const colorClass = {
    primary: "focus:ring-purple-500 focus:border-purple-500",
    secondary: "focus:ring-yellow-500 focus:border-yellow-500",
  }[color];

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <input
      className={`${widthClass} text-sm px-2 py-1 rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${variantClass} ${colorClass} ${className}`}
      {...props}
    />
  );
};
