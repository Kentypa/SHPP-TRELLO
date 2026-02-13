import type { HTMLAttributes, CSSProperties, SyntheticEvent } from "react";
import { cx } from "./slot-utils";

type PropValue =
  | string
  | number
  | boolean
  | CSSProperties
  | ((event: SyntheticEvent) => void)
  | undefined;

type SafeProps = Record<string, PropValue>;

export function mergeProps<T extends HTMLAttributes<HTMLElement>>(
  slotProps: T,
  childProps: T,
): T {
  const overrideProps = { ...childProps } as unknown as SafeProps;
  const slotPropsSafe = slotProps as unknown as SafeProps;

  for (const propName in childProps) {
    const slotValue = slotPropsSafe[propName];
    const childValue = overrideProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);

    if (
      isHandler &&
      typeof slotValue === "function" &&
      typeof childValue === "function"
    ) {
      overrideProps[propName] = (event: SyntheticEvent) => {
        childValue(event);
        slotValue(event);
      };
      continue;
    }

    if (
      propName === "style" &&
      typeof slotValue === "object" &&
      typeof childValue === "object"
    ) {
      overrideProps[propName] = {
        ...(slotValue as CSSProperties),
        ...(childValue as CSSProperties),
      };
      continue;
    }

    if (
      propName === "className" &&
      typeof slotValue === "string" &&
      typeof childValue === "string"
    ) {
      overrideProps[propName] = cx(slotValue, childValue);
      continue;
    }
  }

  return { ...slotProps, ...overrideProps };
}
