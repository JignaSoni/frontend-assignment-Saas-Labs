import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Projects from "./Projects";

describe("Projects Component", () => {
  it("renders the table with the correct number of rows per page", async () => {
    render(<Projects />);

    // Verify dropdown is rendered with default value
    const dropdown = screen.getByLabelText(/rows per page/i);
    expect(dropdown.value).toBe("5");

    // Waiting for the data to load
    const rows = await screen.findAllByRole("row");
    expect(rows.length).toBe(6); // 5 rows + 1 header row (default is 5 rows per page)
  });

  it("updates rows per page when dropdown value changes", async () => {
    render(<Projects />);

    // Wait for the data to load
    const dropdown = await screen.findByLabelText(/rows per page/i);

    // Change rows per page to 10
    fireEvent.change(dropdown, { target: { value: "10" } });

    // Verify the number of rows displayed (10 rows + 1 header row)
    const rows = await screen.findAllByRole("row");
    expect(rows.length).toBe(11);
  });

  it("navigates between pages correctly", async () => {
    render(<Projects />);

    // Wait for the data to load
    const nextButton = await screen.findByText(/next/i);

    // Click "Next" button
    fireEvent.click(nextButton);

    // Verify page number has changed
    const pageIndicator = screen.getByText(/page 2 of/i);
    expect(pageIndicator).toBeInTheDocument();
  });

  it("disables 'Previous' button on the first page", async () => {
    render(<Projects />);

    // Wait for the data to load
    const prevButton = await screen.findByText(/previous/i);

    // Verify "Previous" button is disabled
    expect(prevButton).toBeDisabled();
  });

  it("disables 'Next' button on the last page", async () => {
    render(<Projects />);

    // Wait for the data to load
    const dropdown = await screen.findByLabelText(/rows per page/i);

    // Set rows per page to a high number to limit pages
    fireEvent.change(dropdown, { target: { value: "20" } });

    const nextButton = screen.getByText(/next/i);

    // Navigate to the last page
    while (!nextButton.disabled) {
      fireEvent.click(nextButton);
    }

    // Verify "Next" button is disabled
    expect(nextButton).toBeDisabled();
  });
});
