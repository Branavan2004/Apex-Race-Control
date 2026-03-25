import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";

describe("Index page", () => {
  it("renders the main portfolio sectors", async () => {
    render(<Index />);

    expect(await screen.findByRole("heading", { name: /BRANAVAN KUGANESAN/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "DRIVER PROFILE" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "SKILLS TELEMETRY" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PROJECT CLASSIFICATION" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "EXPERIENCE & LEADERSHIP" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "LIVE TELEMETRY" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ESTABLISH CONTACT" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "FINAL CLASSIFICATION" })).toBeInTheDocument();
  });
});
