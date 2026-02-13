import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefAttributes,
} from "react";
import { mergeProps } from "../../../utils/merge-props";
import { composeRefs } from "../../../utils/slot-utils";

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

interface ElementWithRef extends ReactElement<HTMLAttributes<HTMLElement>> {
  ref?: Ref<HTMLElement>;
}

export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    const childrenArray = Children.toArray(children);
    const child = childrenArray.find(isValidElement);

    if (!child) return null;

    if (childrenArray.length > 1) {
      console.warn("[Slot] Expected exactly one child");
    }

    const element = child as ElementWithRef;

    const mergedProps = mergeProps(slotProps, element.props);
    const childRef = element.ref;

    return cloneElement(element, {
      ...mergedProps,
      ref: composeRefs(forwardedRef, childRef),
    } as HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>);
  },
);

Slot.displayName = "Slot";
