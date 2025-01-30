import React, { useState } from "react";
import Input from "./input.js";
import { EyeOff, Eye } from "lucide-react";

const PasswordInput = (props) => {
  const { onVisibleChange, ...rest } = props;

  const [pwInputType, setPwInputType] = useState("password");

  const onPasswordVisibleClick = (e) => {
    e.preventDefault();
    const nextValue = pwInputType === "password" ? "text" : "password";
    setPwInputType(nextValue);
    onVisibleChange?.(nextValue === "text");
  };

  return (
    <Input
      {...rest}
      type={pwInputType}
      suffix={
        <span
          className="cursor-pointer text-xl"
          onClick={(e) => onPasswordVisibleClick(e)}
        >
          {pwInputType === "password" ? <EyeOff /> : <Eye />}
        </span>
      }
    />
  );
};

export default PasswordInput;
