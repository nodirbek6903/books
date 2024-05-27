import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Books from "./components/Books/Books";
import Register from "./auth/Register/Register";
import AddBooks from "./components/AddBooks/AddBooks";

function App() {
  const token = localStorage.getItem("Key");
  useEffect(() => {
    if (token) {
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, [token]);

  return (
    <>
      <Routes>
        {token ? (
          <>
          <Route path="/" element={<Books />} />
          <Route path="/addbook" element={<AddBooks />} />
          </>
        ) : (
          <Route path="/signup" element={<Register />} />
        )}
      </Routes>
    </>
  );
}

export default App;
