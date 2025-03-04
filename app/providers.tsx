"use client";

import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#ff0080",
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
