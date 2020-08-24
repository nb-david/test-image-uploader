import React from "react";
import { Button as AntdButton } from "antd";
import Theme, { ThemeProps } from "../../themes";

interface ButtonProps {
  children?: React.ReactNode;
  type: "text" | "link" | "ghost" | "default" | "primary" | "dashed" | undefined;
  onClick: () => void;
}

const Button = ({ type, children }: ButtonProps & ThemeProps) => {
  return (
    <Theme>
      <AntdButton type={type}>{children}</AntdButton>
    </Theme>
  );
};

export default Button;
