import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookDetails from "./BookDetails";
import { useFavorites } from "../Components/context/FavoritesContext";
import { fetchBookById } from "../Components/api/googleBooks";
import { vi } from "vitest";

vi.mock("../Components/api/googleBooks", () => ({
  fetchBookById: vi.fn(),
}));

vi.mock("../Components/context/FavoritesContext", () => ({
  useFavorites: vi.fn(),
}));

describe("BookDetails Component", () => {
  const mockBook = {
    id: "book1",
    volumeInfo: {
      title: "Sample Book",
      authors: ["Author A"],
      publisher: "Publisher A",
      publishedDate: "2022",
      description: "Sample description",
      imageLinks: { thumbnail: "test.jpg" },
    },
  };

  test("renders loading state first", async () => {
    fetchBookById.mockResolvedValueOnce(mockBook);
    useFavorites.mockReturnValue({
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/book/book1"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Sample Book/i)).toBeInTheDocument()
    );
  });

  test("displays book details correctly", async () => {
    fetchBookById.mockResolvedValueOnce(mockBook);
    useFavorites.mockReturnValue({
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/book/book1"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Sample Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Author A/i)).toBeInTheDocument();
    expect(screen.getByText(/Publisher A/i)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample description/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add to Favorites/i })
    ).toBeInTheDocument();
  });

  test("favorites button works correctly", async () => {
    const addFavoriteMock = vi.fn();
    const removeFavoriteMock = vi.fn();

    fetchBookById.mockResolvedValueOnce(mockBook);
    useFavorites.mockReturnValue({
      favorites: [],
      addFavorite: addFavoriteMock,
      removeFavorite: removeFavoriteMock,
    });

    render(
      <MemoryRouter initialEntries={["/book/book1"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const favButton = await screen.findByRole("button", {
      name: /Add to Favorites/i,
    });

    await userEvent.click(favButton);

    expect(addFavoriteMock).toHaveBeenCalledTimes(1);
    expect(addFavoriteMock).toHaveBeenCalledWith(mockBook);
  });

  test("removes from favorites if already added", async () => {
    const addFavoriteMock = vi.fn();
    const removeFavoriteMock = vi.fn();

    fetchBookById.mockResolvedValueOnce(mockBook);
    useFavorites.mockReturnValue({
      favorites: [mockBook],
      addFavorite: addFavoriteMock,
      removeFavorite: removeFavoriteMock,
    });

    render(
      <MemoryRouter initialEntries={["/book/book1"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const removeButton = await screen.findByRole("button", {
      name: /Remove from Favorites/i,
    });

    console.log("Button found:", removeButton.textContent);

    await userEvent.click(removeButton);

    console.log("removeFavoriteMock calls:", removeFavoriteMock.mock.calls);

    expect(removeFavoriteMock).toHaveBeenCalledTimes(1);
    expect(removeFavoriteMock).toHaveBeenCalledWith(mockBook.id);
  });
});
