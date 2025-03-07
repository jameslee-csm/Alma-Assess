import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

// Create a custom render function if you need to wrap components in providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { ...options });

export * from "@testing-library/react";
export { customRender as render };
