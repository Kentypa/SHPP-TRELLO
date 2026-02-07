import { useState, type FC, type InputHTMLAttributes } from "react";
import { Button } from "../Button";
import Eye from "../../../../assets/icons/eye.svg?react";
import EyeClosed from "../../../../assets/icons/eye-crossed.svg?react";

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  iconProps: string;
};

export const InputPassword: FC<InputPasswordProps> = ({
  iconProps,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const EyeIcon = show ? Eye : EyeClosed;

  return (
    <div className="flex relative">
      <input {...props} type={show ? "text" : "password"} />
      <Button type="button" onClick={() => setShow((prev) => !prev)}>
        <EyeIcon className={iconProps} />
      </Button>
    </div>
  );
};
