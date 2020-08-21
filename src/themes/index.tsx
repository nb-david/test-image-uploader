import React from "react";
import { ThemeProvider } from "styled-components";
import defaultTheme from './default'

interface ThemeProps {
  themeName?: string;
  children?: React.ReactNode;
}

const Theme = ({ themeName, children }: ThemeProps) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default Theme;
