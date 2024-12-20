import {
  PropsWithChildren,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { ClickAway } from "../ClickAway/ClickAway";

export const Menu = ({
  anchorEl,
  children,
  onClose,
}: PropsWithChildren<{
  anchorEl: HTMLElement | null;
  onClose?: () => void;
}>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [styles, setStyles] = useState<React.CSSProperties>({});
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (anchorEl) {
      setOpen(!!anchorEl);
    }
  }, [anchorEl]);

  useLayoutEffect(() => {
    if (!open) {
      setStyles({});
    }

    if (!anchorEl || !menuRef.current) {
      return;
    }

    const anchorRect = anchorEl.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const scrollingElement = document.scrollingElement;
    const hasScrollBar =
      (scrollingElement?.scrollHeight ?? 0) >
      (scrollingElement?.clientHeight ?? 0);
    const { innerWidth, innerHeight } = window;
    const gap = 10;
    const top = anchorRect.bottom + (anchorRect.top > gap ? gap : 0);
    const left = anchorRect.left;
    const menuWidth = menuRect.width;
    const menuHeight = menuRect.height;

    const adjustedLeft =
      left + menuWidth + gap > innerWidth
        ? innerWidth - menuWidth - gap - (hasScrollBar ? 10 : 0)
        : left;
    const adjustedTop =
      top + menuHeight + gap > innerHeight
        ? innerHeight - menuHeight - gap
        : top;

    setStyles({
      position: "absolute",
      top: adjustedTop,
      left: adjustedLeft,
    });
  }, [anchorEl, open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed right-0 left-0 top-0 bottom-0" onClick={handleToggle}>
      <div
        ref={menuRef}
        style={{
          ...styles,
        }}
        className="menu bg-purple-600 text-white shadow-lg p-2 rounded-md"
        onClick={handleToggle}
        hidden={!open}
      >
        <ClickAway
          onClickAway={() => {
            onClose?.();
            setOpen(false);
          }}
        >
          <div className="flex flex-col space-y-2">{children}</div>
        </ClickAway>
      </div>
    </div>
  );
};
