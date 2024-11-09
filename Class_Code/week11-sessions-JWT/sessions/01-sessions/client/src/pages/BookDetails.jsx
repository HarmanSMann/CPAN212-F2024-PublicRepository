import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState for managing the fetched data
import "./BookDetails.css";

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Fetch book ID from URL params
  const [book, setBook] = useState(null); // State to store book details

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await fetch(`http://localhost:8001/book/details/${id}`);
        const data = await response.json();
        setBook(data); // Update state with the fetched book data
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    }
    fetchBookDetails();
  }, [id]); // Dependency array contains `id`, so it runs on component mount or when `id` changes

  return (
    <div className="book-details">
      <button onClick={() => navigate("/")}>Back to All Books</button>
      {book ? (
        <>
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Pages:</strong> {book.pages}
          </p>
          <p>
            <strong>Genres:</strong> {book.genres.join(", ")}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Price:</strong> {book.price}
          </p>
        </>
      ) : (
        <p>Loading...</p> // Show a loading message while the book data is being fetched
      )}
    </div>
  );
}

export default BookDetails;
