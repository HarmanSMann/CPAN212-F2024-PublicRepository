import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    genres: "",
    publisher: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8001/book/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach the JWT token
        },
        body: JSON.stringify({ ...formData, genres: formData.genres.split(", ") }),
      });
      if (response.ok) {
        alert("Book created successfully!");
        navigate("/");
      } else {
        alert("Error creating book");
      }
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Book</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
      <input name="pages" value={formData.pages} onChange={handleChange} placeholder="Pages" required />
      <input name="genres" value={formData.genres} onChange={handleChange} placeholder="Genres (comma-separated)" required />
      <input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher" />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default NewBook;
