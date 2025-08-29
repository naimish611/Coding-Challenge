import React from 'react';
import { useFavorites } from '../Components/context/FavoritesContext';
import BookList from './BookList';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section>
      <h2 className="favorites-title">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className="favorites-empty">No favorites added yet</p>
      ) : (
        <BookList books={favorites} />
      )}
    </section>
  );
};

export default FavoritesPage;
