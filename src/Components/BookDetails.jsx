import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../Components/api/googleBooks";
import { useFavorites } from "../Components/context/FavoritesContext";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetchBookById(id);
      setBook(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!book) return <div className="not-found">Book not found.</div>;

  const info = book.volumeInfo || {};
  const isFav = favorites.some((fav) => fav.id === book.id);

  return (
    <div className="book-details-container">
      <div className="book-details-card">
        
        <div className="book-image">
          <img
            src={info.imageLinks?.thumbnail}
            alt={info.title}
            className="fade-in"
          />
        </div>

       
        <div className="book-info">
          <h1 className="book-title">{info.title}</h1>
          <p className="book-authors">
            <strong>Authors:</strong>{" "}
            {info.authors ? info.authors.join(", ") : "Unknown"}
          </p>
          <p>
            <strong>Publisher:</strong> {info.publisher || "N/A"}
          </p>
          <p>
            <strong>Published Date:</strong> {info.publishedDate || "N/A"}
          </p>
          <p className="book-description">
            {info.description || "No description available."}
          </p>

          <button
            onClick={() =>
              isFav ? removeFavorite(book.id) : addFavorite(book)
            }
            className={isFav ? "btn-remove" : "btn-fav"}
          >
            {isFav ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
