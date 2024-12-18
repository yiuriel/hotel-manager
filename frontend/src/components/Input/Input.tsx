export const Input = ({
  className,
  variant = "contained",
  color = "primary",
  ...props
}: {
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
} & React.ComponentPropsWithoutRef<"input">) => {
  const variantClass = {
    contained: "border border-purple-300",
    outlined: "border-0",
  }[variant];

  const colorClass = {
    primary: "focus:ring-purple-500 focus:border-purple-500",
    secondary: "focus:ring-yellow-500 focus:border-yellow-500",
  }[color];

  return (
    <input
      className={`text-sm px-2 py-1 rounded-sm shadow-sm focus:outline-none transition duration-150 ease-in-out w-full ${variantClass} ${colorClass} ${className}`}
      {...props}
    />
  );
};
