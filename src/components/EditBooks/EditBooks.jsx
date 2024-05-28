import { useState } from "react";
import "./EditBooks.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const EditBooks = () => {
  const [isbn, setIsbn] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const host_url = "https://no23.lavina.tech";
  const key = localStorage.getItem("Key");
  const secret = localStorage.getItem("Sign");

  const handleBackBooks = () => {
    navigate("/");
  };

  const editBooks = async (e) => {
    e.preventDefault();
    try {
      const method = "PATCH";
      const url = `/books/${id}`;
      const status = localStorage.getItem("status");
      const body = {
        status: status,
      };
      const stringToSign = `${method}${url}${JSON.stringify(body)}${secret}`;
      const sign = CryptoJS.MD5(stringToSign).toString();
      const response = await fetch(`${host_url}${url}`, {
        method: method,
        headers: {
          Key: key,
          Sign: sign,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        alert("Error updating book");
        return false;
      }
      console.log("Book successfully updated");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-form">
        <div className="back_and_title">
          <h1>Edit Book</h1>
          <button className="back-btn" onClick={handleBackBooks}>
            <IoMdArrowRoundBack /> Back
          </button>
        </div>
        <form onSubmit={editBooks} className="adds">
          <div className="forma-inputs">
            <div className="form-label-inputs">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="ISBN"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
