import type { FC } from "react";

export const CardPlaceholder: FC = () => {
  return (
    <li className="h-13 bg-neutral-700/30 border-2 border-dashed border-neutral-500 rounded-md transition-all duration-200 my-1 pointer-events-none" />
  );
};
