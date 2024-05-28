import { useNavigate } from "react-router-dom";
import "./AddBooks.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import CryptoJS from "crypto-js";
import { useState } from "react";
const AddBooks = () => {
  const [isbn, setIsbn] = useState("");
  const navigate = useNavigate();
  const host_url = "https://no23.lavina.tech";

  const handleBackBooks = () => {
    navigate("/");
  };

  const key = localStorage.getItem("Key");
  const secret = localStorage.getItem("Sign");

  const generateSignature = (method, url, body, secret) => {
    const body_string = JSON.stringify(body);
    const stringToSign = `${method}${url}${body_string}${secret}`;
    const signature = CryptoJS.MD5(stringToSign).toString();
    return signature;
  };

  const sendBooks = async (e) => {
    e.preventDefault();
    try {
      const method = "POST";
      const body = {
        isbn: isbn,
      };
      const url = "/books";
      const sign = generateSignature(method, url, body, secret);
      const response = await fetch(`${host_url}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Key: key,
          Sign: sign,
        },
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("data muvaffaqqiyatli qoshildi", data);
      }
      if (response.status === 500) {
        alert("Bunday kitob allaqachon mavjud");
        return false;
      }
      navigate("/");
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-form">
        <div className="back_and_title">
          <h1>Add Book</h1>
          <button className="back-btn" onClick={handleBackBooks}>
            <IoMdArrowRoundBack /> Back
          </button>
        </div>
        <form action="" onSubmit={sendBooks} className="adds">
          <div className="forma-inputs">
            <div className="form-label-inputs">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Isbn"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
