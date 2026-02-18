import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type Dispatch,
  type HTMLAttributes,
  type RefObject,
  type SetStateAction,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { composeRefs } from "../../../utils/slot-utils";
import { Slot } from "../../wrappers/Slot";

type DialogContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  triggerRef: RefObject<HTMLElement | null>;
};

const DialogContext = createContext<DialogContextType | null>(null);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Dialog components must be within <Dialog>");
  return context;
};

export const DialogRoot = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  return (
    <DialogContext.Provider value={{ isOpen, triggerRef, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

type TriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { setIsOpen, triggerRef } = useDialog();

    const Comp = asChild ? Slot : "button";

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    };

    const combinedRef = composeRefs<HTMLElement>(triggerRef, ref);

    return (
      <Comp
        ref={combinedRef}
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-expanded={true}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

type ContentProps = HTMLAttributes<HTMLDivElement>;

const Content = ({
  children,
  ...props
}: ContentProps & { children: ReactNode }) => {
  const { isOpen, setIsOpen, triggerRef } = useDialog();
  const contentRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        zIndex: 50,
      });
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;

      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    
  }, [isOpen, setIsOpen, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div ref={contentRef} style={style} {...props}>
      {children}
    </div>,
    document.body,
  );
};

export const Dialog = Object.assign(DialogRoot, {
  Trigger,
  Content,
});
