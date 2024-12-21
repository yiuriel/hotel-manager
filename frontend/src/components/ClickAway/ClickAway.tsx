import { useEffect, useRef } from "react";

export const ClickAway = ({
  children,
  onClickAway,
}: {
  children: React.ReactNode;
  onClickAway: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};
