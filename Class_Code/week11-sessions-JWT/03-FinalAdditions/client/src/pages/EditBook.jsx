import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    genres: "",
    publisher: "",
    price: "",
  });

  useEffect(() => {
    async function fetchBook() {
      const response = await fetch(`http://localhost:8001/book/details/${id}`);
      const book = await response.json();
      setFormData({
        title: book.title,
        author: book.author,
        pages: book.pages,
        genres: book.genres.join(", "),
        publisher: book.publisher,
        price: book.price,
      });
    }
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8001/book/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach the JWT token
        },
        body: JSON.stringify({ ...formData, genres: formData.genres.split(", ") }),
      });
      if (response.ok) {
        alert("Book updated successfully!");
        navigate(`/book/details/${id}`);
      } else {
        alert("Error updating book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
      <input name="pages" value={formData.pages} onChange={handleChange} placeholder="Pages" required />
      <input name="genres" value={formData.genres} onChange={handleChange} placeholder="Genres (comma-separated)" required />
      <input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher" />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditBook;
