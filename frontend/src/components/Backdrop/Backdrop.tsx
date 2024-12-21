import { FC } from "react";

interface BackdropProps {
  onClick?: () => void;
}

export const Backdrop: FC<BackdropProps> = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClick}
    />
  );
};
