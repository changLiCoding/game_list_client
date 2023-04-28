import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContextWrapper from "@/ContextWrapper";
import Dashboard from "@/pages/Dashboard/Dashboard";

describe("App", () => {
  it("Renders Dashboard", async () => {
    render(
      <ContextWrapper>
        <Dashboard />
      </ContextWrapper>
    );

    await userEvent.click(screen.getByRole("button", { name: "Logout" }));
  });
});
