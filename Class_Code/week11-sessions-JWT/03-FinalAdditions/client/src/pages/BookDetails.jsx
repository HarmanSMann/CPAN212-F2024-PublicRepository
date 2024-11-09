import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookDetails.css";

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await fetch(`http://localhost:8001/book/details/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    }
    fetchBookDetails();
  }, [id]);

  // Function to delete the book
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8001/book/delete-book/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach the JWT token
        },
      });
      if (response.ok) {
        alert("Book deleted successfully!");
        navigate("/"); // Navigate back to the homepage
      } else {
        alert("Error deleting book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Function to navigate to the edit page
  const handleEdit = () => {
    navigate(`/book/edit/${id}`);
  };

  return (
    <div className="book-details">
      <button onClick={() => navigate("/")}>Back to All Books</button>
      {book ? (
        <>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
          <p><strong>Genres:</strong> {book.genres.join(", ")}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Price:</strong> {book.price}</p>
          <button onClick={handleEdit}>Edit Book</button>
          <button onClick={handleDelete}>Delete Book</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetails;
