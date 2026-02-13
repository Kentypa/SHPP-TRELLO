import type { Ref, RefCallback, RefObject } from "react";

export function composeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as RefObject<T | null>).current = node;
      }
    });
  };
}

export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
