import type { FC, PropsWithChildren } from "react";

export type ComponentWithChildren<T = object> = FC<PropsWithChildren<T>>;
