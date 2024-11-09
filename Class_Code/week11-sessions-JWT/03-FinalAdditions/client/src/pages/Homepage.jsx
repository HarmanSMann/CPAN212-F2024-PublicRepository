import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { useEffect, useState } from "react";
import "./Homepage.css";

function Homepage({ onViewDetails }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    async function fetchBooks() {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8001/book/fetch-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Attach the JWT token
          },
        });

        const data = await response.json();

        // Ensure data is an array before setting it to state
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>All Books</h2>
      <button onClick={() => navigate("/book/new")}>New Book</button>  {/* Using navigate for new book */}
      <div className="book-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
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
