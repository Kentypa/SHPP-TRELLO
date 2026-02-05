import type { ButtonHTMLAttributes } from "react";
import type { ComponentWithChildren } from "../../../types/component-with-children";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: ComponentWithChildren<ButtonProps> = ({
  children,
  ...otherProps
}) => {
  return <button {...otherProps}>{children}</button>;
};
