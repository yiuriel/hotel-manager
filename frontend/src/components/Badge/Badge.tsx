export const Badge = ({ children }: { children: number }) => (
  <div className="absolute -bottom-3 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-light leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full">
    {children}
  </div>
);
