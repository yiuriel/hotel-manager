import { Button } from "../Button/Button";

export interface CardAction {
  label: React.ReactNode;
  action: () => void;
}

export const Card = ({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions?: [CardAction, CardAction] | [CardAction];
}) => {
  return (
    <div className="rounded-md shadow-xl min-h-80 max-h-80 flex flex-col justify-between overflow-hidden">
      <div className="bg-white h-full overflow-auto">{children}</div>
      {actions && (
        <div className="flex justify-end">
          {actions.map(({ label, action }, i) => (
            <Button
              key={i}
              className="px-4 py-2 flex-1 !rounded-none"
              color={i === 0 ? "primary" : "secondary"}
              onClick={action}
            >
              {label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
