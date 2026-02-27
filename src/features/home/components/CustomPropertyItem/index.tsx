import type { FC } from "react";
import { Button } from "../../../../shared/components/ui/Button";
import type { CustomField } from "../../types/custom-field";

type CustomPropertyItemProps = {
  onRemove: (id: number) => void;
  onUpdate: (id: number, part: "key" | "value", val: string) => void;
  field: CustomField;
};

export const CustomPropertyItem: FC<CustomPropertyItemProps> = ({
  field,
  onUpdate,
  onRemove,
}) => (
  <li className="flex gap-2">
    <input
      required
      placeholder="Key"
      className="border-2 p-1 rounded-md w-full"
      value={field.key}
      onChange={(e) => onUpdate(field.id, "key", e.target.value)}
    />
    <input
      required
      placeholder="Value"
      className="border-2 p-1 rounded-md w-full"
      value={field.value}
      onChange={(e) => onUpdate(field.id, "value", e.target.value)}
    />
    <Button
      type="button"
      onClick={() => onRemove(field.id)}
      className="bg-red-500 p-2 rounded-md"
    >
      Remove
    </Button>
  </li>
);
