import React from "react";
import BookCard from "./BookCard";
import "./BookList.css";

function BookList({ books }) {
  if (!books || books.length === 0)
    return (
      <div className="no-data">
        <h2>No Results Found</h2>
      </div>
    );

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
