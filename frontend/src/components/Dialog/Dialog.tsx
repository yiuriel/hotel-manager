import { Backdrop } from "../Backdrop/Backdrop";
import { ClickAway } from "../ClickAway/ClickAway";

export const Dialog = ({
  title,
  children,
  onClose,
  open,
  className = "w-80",
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  className?: string;
}) => {
  if (!open) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center mx-auto ${className}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ClickAway onClickAway={onClose}>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <header className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </header>
            <div className="">{children}</div>
          </div>
        </ClickAway>
      </div>
    </>
  );
};
