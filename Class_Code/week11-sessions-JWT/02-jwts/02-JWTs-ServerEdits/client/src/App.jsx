import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Default route for Login */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/book/details/:id" element={<BookDetails />} /> {/* BookDetails with dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;
