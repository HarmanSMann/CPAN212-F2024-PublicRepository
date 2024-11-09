import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./Homepage.css";

function Homepage({ onViewDetails }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:8001/book/fetch-all");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>All Books</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div
            key={book._id}
            className="book-card"
          >
            <Link to={`/book/details/${book._id}`} onClick={() => onViewDetails(book)}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
