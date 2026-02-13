import { createPortal } from "react-dom";
import type { ComponentWithChildren } from "../../../types/component-with-children";

type ModalProps = {
  visible: boolean;
  toggleModal: () => void;
  className: string;
};

export const Modal: ComponentWithChildren<ModalProps> = ({
  visible,
  children,
  className,
  toggleModal,
}) => {
  return (
    <>
      {visible &&
        createPortal(
          <div className={className} onClick={toggleModal}>
            <div className="contents" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
