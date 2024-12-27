export const Button = ({
  className,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  size = "md",
  disabled,
  ...props
}: {
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "submit";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
} & React.ComponentProps<"button">) => {
  const baseClasses =
    "rounded-md shadow-sm font-medium transition duration-150 ease-in-out flex items-center justify-center";
  const fullWidthClass = fullWidth ? "w-full" : "";
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  }[size];

  const getColorClasses = (color: string, variant: string) => {
    switch (color) {
      case "primary":
        return variant === "contained"
          ? "bg-purple-600 hover:bg-purple-700 text-yellow-50"
          : "border border-purple-600 hover:border-purple-700 text-purple-600";
      case "secondary":
        return variant === "contained"
          ? "bg-yellow-500 hover:bg-yellow-400 text-gray-700"
          : "border border-yellow-500 hover:border-yellow-400 text-yellow-500";
      case "submit":
        return variant === "contained"
          ? "bg-blue-500 hover:bg-blue-600 text-gray-50"
          : "border border-blue-500 hover:border-blue-600 text-blue-500";
      default:
        return "";
    }
  };

  const colorClasses = getColorClasses(color, variant);

  const disabledClasses =
    disabled && variant === "contained"
      ? "bg-gray-200 text-gray-800 cursor-not-allowed"
      : disabled && variant === "outlined"
      ? "border border-gray-200 text-gray-800 cursor-not-allowed"
      : "";

  const finalClasses = `${baseClasses} ${fullWidthClass} ${sizeClasses} ${
    disabled ? "bg-gray-200" : colorClasses
  } ${disabledClasses} ${className}`;

  return <button className={finalClasses} disabled={disabled} {...props} />;
};
