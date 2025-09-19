import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchForm from "./SearchForm";
import { searchBooks } from "../Components/api/googleBooks";
import { vi } from "vitest";

vi.mock("../Components/api/googleBooks", () => ({
  searchBooks: vi.fn(),
}));

vi.mock("../Components/BookList", () => ({
  default: ({ books }) => (
    <div>
      {books.map((b) => (
        <div key={b.id} data-testid="book-item">
          {b.volumeInfo.title} - {b.volumeInfo.authors?.join(", ")}
        </div>
      ))}
    </div>
  ),
}));

describe("SearchForm Component", () => {
  test("renders form correct", () => {
    render(<SearchForm />);
    expect(
      screen.getByRole("heading", { name: /Search Books/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Book title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Book author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Book genre or keyword/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  test("all fields are empty", async () => {
    render(<SearchForm />);
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please enter at least one field."
    );
  });

  test("calls searchBooks and displays result", async () => {
    const mockBooks = [
      {
        id: "1",
        volumeInfo: {
          title: "Test Book",
          authors: ["Author A"],
          publisher: "Publisher A",
        },
      },
    ];

    searchBooks.mockImplementation(() => Promise.resolve(mockBooks));

    render(<SearchForm />);

    fireEvent.change(screen.getByLabelText(/Book title/i), {
      target: { value: "React" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // screen.debug();

    expect(await screen.findByText(/Test Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Author A/i)).toBeInTheDocument();
  });
});
