import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook'; // Import the EditBook component
import NewBook from './pages/NewBook';   // Import the NewBook component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/" element={<Homepage />} /> {/* Homepage route */}
        <Route path="/book/details/:id" element={<BookDetails />} /> {/* BookDetails with dynamic route */}
        <Route path="/book/edit/:id" element={<EditBook />} /> {/* Edit Book route */}
        <Route path="/book/new" element={<NewBook />} /> {/* New Book route */}
      </Routes>
    </Router>
  );
}

export default App;
