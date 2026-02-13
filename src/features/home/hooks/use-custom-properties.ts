import { useState } from "react";
import type { CustomField } from "../types/custom-field";

export const useCustomProperties = (
  onSync: (custom?: Record<string, string>) => void,
) => {
  const [fields, setFields] = useState<CustomField[]>([]);

  const sync = (updated: CustomField[]) => {
    if (updated.length === 0) {
      onSync({});
      return;
    }

    const obj: Record<string, string> = {};
    let hasValidKeys = false;

    updated.forEach((f) => {
      if (f.key.trim()) {
        obj[f.key] = f.value;
        hasValidKeys = true;
      }
    });

    onSync(hasValidKeys ? obj : {});
  };

  const add = () => {
    const id = fields.length > 0 ? Math.max(...fields.map((f) => f.id)) + 1 : 0;
    setFields([...fields, { id, key: "", value: "" }]);
  };

  const remove = (id: number) => {
    const updated = fields.filter((f) => f.id !== id);
    setFields(updated);
    sync(updated);
  };

  const update = (id: number, part: "key" | "value", val: string) => {
    const updated = fields.map((f) =>
      f.id === id ? { ...f, [part]: val } : f,
    );
    setFields(updated);
    sync(updated);
  };

  const setInitial = (custom?: Record<string, string>) => {
    if (!custom) {
      setFields([]);
      return;
    }
    setFields(
      Object.entries(custom).map(([key, value], index) => ({
        id: index,
        key,
        value,
      })),
    );
  };

  const reset = () => setFields([]);

  return { fields, add, remove, update, reset, setInitial };
};
