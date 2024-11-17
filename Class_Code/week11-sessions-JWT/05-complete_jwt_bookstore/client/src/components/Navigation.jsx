import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Correct import

const Navigation = () => {
  const navigate = useNavigate(); // Hook to navigate after logging out
  const token = localStorage.getItem("authToken"); // Get the token from localStorage
  const isAuthenticated = token ? true : false; // Check if the user is authenticated

  let userName = "Guest";
  if (isAuthenticated) {
    try {
      // Decode the token and get the user's name
      const decodedToken = jwtDecode(token); // Use jwt-decode to decode the token
      userName = decodedToken?.first_name || "User"; // Get the user's name or default to "User"
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <header className="navigation">
      <h1 className="brand-title">Bookstore</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/books">All Books</Link>
        <Link to="/books/add">Add Book</Link>

        {isAuthenticated ? (
          <>
            <span>Hello, {userName}!</span> {/* Greet the user by name */}
            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
