import { Routes, Route} from "react-router-dom";
import Books from "./components/Books/Books";
import Register from "./auth/Register/Register";
import AddBooks from "./components/AddBooks/AddBooks";
import EditBooks from "./components/EditBooks/EditBooks";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/addbook" element={<AddBooks />} />
        <Route path="/editbooks/:id" element={<EditBooks />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
