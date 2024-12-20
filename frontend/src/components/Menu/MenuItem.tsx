export const MenuItem = ({
  children,
  onClick,
  className,
  color = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary";
}) => {
  const colorClass = {
    primary: "hover:bg-purple-200 hover:bg-opacity-30",
    secondary: "hover:bg-yellow-200 hover:bg-opacity-30",
  }[color];

  return (
    <div
      className={`px-2 text-md font-thin rounded-sm cursor-pointer transition-colors duration-150 ease-in-out ${colorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
