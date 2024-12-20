export const Button = ({
  className,
  variant = "contained",
  color = "primary",
  ...props
}: {
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
} & React.ComponentProps<"button">) => {
  const variantClass = {
    contained: "bg-purple-600 hover:bg-purple-700",
    outlined: "bg-transparent border border-purple-600 hover:border-purple-700",
  }[variant];

  const colorClass = {
    primary: "text-yellow-50",
    secondary: "bg-yellow-500 text-grey-700 hover:bg-yellow-400",
  }[color];

  return (
    <button
      className={`px-4 py-2 rounded-sm shadow-sm text-sm font-medium transition duration-150 ease-in-out w-full ${variantClass} ${colorClass} ${className}`}
      {...props}
    />
  );
};
