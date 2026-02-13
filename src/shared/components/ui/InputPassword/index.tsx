import { useState, type FC, type InputHTMLAttributes } from "react";
import { Button } from "../Button";
import Eye from "../../../../assets/icons/eye.svg?react";
import EyeClosed from "../../../../assets/icons/eye-crossed.svg?react";

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  iconClassName: string;
};

export const InputPassword: FC<InputPasswordProps> = ({
  iconClassName,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const EyeIcon = show ? Eye : EyeClosed;

  return (
    <div className="flex relative">
      <input {...props} type={show ? "text" : "password"} />
      <Button type="button" onClick={() => setShow((prev) => !prev)}>
        <EyeIcon className={iconClassName} />
      </Button>
    </div>
  );
};
