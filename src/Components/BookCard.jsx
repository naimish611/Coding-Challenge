import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../Components/context/FavoritesContext";
import "./BookCard.css";

function BookCard({ book }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFav = favorites.some((fav) => fav.id === book.id);

  const { title, authors, description, imageLinks } = book.volumeInfo;
  const img = imageLinks?.thumbnail;

  return (
    <div className="book-card">
    
      <div className="book-image">
        {img ? <img src={img} alt={title} /> : <span>No Image</span>}
      </div>

      
      <div className="book-content">
        <h3 className="book-title">{title}</h3>
        <p className="book-authors">
          {authors ? authors.join(", ") : "Unknown Author"}
        </p>
        <p className="book-description">
          {description ? description.slice(0, 120) + "..." : "No description available."}
        </p>

        <div className="book-actions">
          <Link to={`/book/${book.id}`} className="details-link">
            Details
          </Link>
          <button
            onClick={() =>
              isFav ? removeFavorite(book.id) : addFavorite(book)
            }
            className={isFav ? "btn-remove" : "btn-fav"}
          >
            {isFav ? "Remove" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
