import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoritesPage from "./FavoritesPage";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import BookList from "./BookList";
import { vi } from "vitest";

// Mock BookList so we can check if it's rendered
vi.mock("./BookList", () => ({
  default: ({ books }) => (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <p>{book.volumeInfo.title}</p>
          <p>{book.volumeInfo.authors.join(", ")}</p>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("./context/FavoritesContext", async () => {
  const actual = await vi.importActual("./context/FavoritesContext");
  return {
    ...actual,
    useFavorites: vi.fn(),
  };
});

describe("FavoritesPage Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders empty state when no favorites", () => {
    useFavorites.mockReturnValue({ favorites: [] });

    render(
      <FavoritesProvider>
        <FavoritesPage />
      </FavoritesProvider>
    );

    expect(screen.getByText(/No favorites added yet/i)).toBeInTheDocument();
  });

  test("renders BookList when favorites exist", () => {
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

    useFavorites.mockReturnValue({ favorites: mockBooks });

    render(
      <FavoritesProvider>
        <FavoritesPage />
      </FavoritesProvider>
    );

    expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Author A/i)).toBeInTheDocument();
  });
});
