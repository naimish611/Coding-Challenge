import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FavoritesProvider } from "./Components/context/FavoritesContext";
import App from "./App";

describe("App component routing", () => {
  test("navigates to Favorites page", async () => {
    render(
      <FavoritesProvider>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </FavoritesProvider>
    );

    userEvent.click(screen.getByText(/Favorites/i));
    expect(await screen.findByText(/Your Favorites/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Search/i));
    expect(await screen.findByText(/Search Books/i)).toBeInTheDocument();

    expect(await screen.findByText(/Book Finder/i)).toBeInTheDocument();
  });
});
