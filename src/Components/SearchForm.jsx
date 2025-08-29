import React, { useState } from "react";
import { searchBooks } from "../Components/api/googleBooks";
import BookList from "../Components/BookList";
import "./SearchForm.css";

function SearchForm() {
  const [fields, setFields] = useState({ title: "", author: "", genre: "" });
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const emptyFields = Object.keys(fields).filter((key) => !fields[key].trim());
    if (emptyFields.length === 3) {
      setError("Please enter at least one field.");
      return;
    }

    setError("");
    setLoading(true);
    const results = await searchBooks(fields);
    setBooks(results);
    setLoading(false);
  };

  return (
    <section className="search-section">
      <form onSubmit={handleSubmit} aria-label="Book search form" className="search-form">
        <h2 className="form-title">Search Books</h2>

        <div className="form-inputs">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={fields.title}
            onChange={handleInput}
            aria-label="Book title"
            className={error && !fields.title ? "input-error" : ""}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={fields.author}
            onChange={handleInput}
            aria-label="Book author"
            className={error && !fields.author ? "input-error" : ""}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre/Keyword"
            value={fields.genre}
            onChange={handleInput}
            aria-label="Book genre or keyword"
            className={error && !fields.genre ? "input-error" : ""}
          />
        </div>

        <button type="submit" className="btn-search">
          Search
        </button>

        {error && (
          <div role="alert" className="error-msg">
            {error}
          </div>
        )}
      </form>

      {loading && <div className="loading">Loading...</div>}

      <div className="book-results">
        <BookList books={books} />
      </div>
    </section>
  );
}

export default SearchForm;
