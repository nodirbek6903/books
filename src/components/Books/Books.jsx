import { FaSearch } from "react-icons/fa";
import CryptoJS from "crypto-js";
import "./Books.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const host_url = "https://no23.lavina.tech";
  const key = localStorage.getItem("Key");
  const secret = localStorage.getItem("Sign");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const method = "GET";
      const url = "/books";
      const stringToSign = `${method}${url}${secret}`;
      const sign = CryptoJS.MD5(stringToSign).toString();
      const response = await fetch(`${host_url}${url}`, {
        method: method,
        headers: {
          Key: key,
          Sign: sign,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }
      const data = await response.json();
      setBooks(data.data);
      console.log("data muvaffaqqiyatli olingan", data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddClick = () => {
    navigate("/addbook");
  };

  const handleEditBooks = (id) => {
    navigate(`/editbooks/${id}`);
  };

  const deleteBooks = async (id) => {
    try {
      const method = "DELETE";
      const url = `/books/${id}`;
      const stringToSign = `${method}${url}${secret}`;
      const sign = CryptoJS.MD5(stringToSign).toString();
      const response = await fetch(`${host_url}${url}`, {
        method: method,
        headers: {
          Key: key,
          Sign: sign,
        },
      });

      if (response.status === 500) {
        alert("Bu kitob allaqachon o'chirilgan");
        return false;
      }

      fetchBooks();
      console.log("data muvaffaqqiyatli o'chirildi");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="books-container">
      <div className="search-add">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for books"
            className="search-input"
          />
          <FaSearch className="search-icons" />
        </div>
        <button className="add-book" onClick={handleAddClick}>
          Add Book
        </button>
      </div>
      <div className="books-table">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>ID</th>
              <th>Isbn</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, index) => (
              <tr key={book?.book?.id}>
                <td>{index + 1}</td>
                <td>{book?.book?.id}</td>
                <td>{book?.book?.isbn}</td>
                <td>
                  <button className="edit" onClick={() => {
                    handleEditBooks(book?.book?.id)
                    localStorage.setItem("status", book?.status)
                  }}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteBooks(book?.book?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
