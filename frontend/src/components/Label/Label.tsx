export const Label = ({
  children,
  className = "",
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) => {
  return (
    <label
      className={`text-sm font-light w-full ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
