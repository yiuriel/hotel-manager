export const Label = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <label className={`text-sm font-light ${className}`}>{children}</label>
  );
};
