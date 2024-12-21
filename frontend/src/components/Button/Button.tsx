export const Button = ({
  className,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  ...props
}: {
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "submit";
  fullWidth?: boolean;
} & React.ComponentProps<"button">) => {
  const colorClass = {
    primary: {
      bg: "bg-purple-600",
      hoverBg: "bg-purple-700",
      text: "text-yellow-50",
    },
    secondary: {
      bg: "bg-yellow-500",
      hoverBg: "bg-yellow-400",
      text: "text-gray-700",
    },
    submit: {
      bg: "bg-blue-500",
      hoverBg: "bg-blue-600",
      text: "text-gray-50",
    },
  }[color];

  const variantClass = {
    contained: `${colorClass.bg} hover:${colorClass.hoverBg}`,
    outlined: "bg-transparent border border-purple-600 hover:border-purple-700",
  }[variant];

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`px-4 py-2 rounded-sm shadow-sm text-sm font-medium transition duration-150 ease-in-out flex items-center justify-center ${width} ${variantClass} ${colorClass.text} ${className}`}
      {...props}
    />
  );
};
