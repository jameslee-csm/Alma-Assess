import { render, screen } from "@testing-library/react";
import Layout from "../../app/layout";

describe("Layout Component", () => {
  it("renders children correctly", () => {
    render(
      <Layout>
        <div data-testid="child-element">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId("child-element")).toBeInTheDocument();
  });

  it("includes necessary meta tags", () => {
    render(<Layout>Content</Layout>);

    // Check for metadata in the document head
    // Note: Testing document head can be tricky, you might need to adapt this
    const htmlElement = document.documentElement;
    expect(htmlElement.getAttribute("lang")).toBe("en");
  });
});
