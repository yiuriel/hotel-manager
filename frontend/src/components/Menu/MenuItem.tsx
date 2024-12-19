export const MenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className="px-2 text-md font-thin rounded-sm hover:bg-yellow-100 hover:bg-opacity-20 transition-colors duration-150 ease-in-out"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
