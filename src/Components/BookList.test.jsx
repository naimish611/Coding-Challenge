import React from "react";
import { render, screen } from "@testing-library/react";
import BookList from "./BookList";
import { vi } from "vitest";

vi.mock("./BookCard", () => ({
  default: ({ book }) => (
    <div data-testid="book-card">{book.volumeInfo.title}</div>
  ),
}));

describe("BookList Component", () => {
  test("renders 'No Results Found' when no books", () => {
    render(<BookList books={[]} />);
    expect(screen.getByText(/No Results Found/i)).toBeInTheDocument();
  });

  test("renders list of books when provided", () => {
    const mockBooks = [
      {
        id: "1",
        volumeInfo: { title: "Test Book 1" },
      },
      {
        id: "2",
        volumeInfo: { title: "Test Book 2" },
      },
    ];

    render(<BookList books={mockBooks} />);

    expect(screen.getByText(/Test Book 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Book 2/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("book-card")).toHaveLength(2);
  });
});
