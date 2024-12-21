export const Button = ({
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
} & React.ComponentProps<"button">) => {
  const variantClass = {
    contained: "bg-purple-600 hover:bg-purple-700",
    outlined: "bg-transparent border border-purple-600 hover:border-purple-700",
  }[variant];

  const colorClass = {
    primary: "text-yellow-50",
    secondary: "bg-yellow-500 text-grey-700 hover:bg-yellow-400",
  }[color];

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`px-4 py-2 rounded-sm shadow-sm text-sm font-medium transition duration-150 ease-in-out flex items-center justify-center ${width} ${variantClass} ${colorClass} ${className}`}
      {...props}
    />
  );
};
