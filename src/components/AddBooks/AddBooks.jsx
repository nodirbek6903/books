import { useNavigate } from "react-router-dom";
import "./AddBooks.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addBook } from "../Books/BookSlice/BookSlice";
const AddBooks = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [pages, setPages] = useState("");
  const [cover, setCover] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackBooks = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      isbn:isbn,
      title:title,
      author:author,
      published:published,
      pages:pages,
      cover:cover,
    };
    try {
      dispatch(addBook(newBook));
      navigate("/");
      console.log("Book added successfully");
    } catch (error) {
      console.error("Failed to add book:", error);
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
        <form action="" onSubmit={handleSubmit} className="adds">
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
            <div className="form-label-inputs">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                required
              />
            </div>
            <div className="form-label-inputs">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                id="author"
                required
              />
            </div>
            <div className="form-label-inputs">
              <label htmlFor="published">Published</label>
              <input
                type="text"
                placeholder="Published"
                id="published"
                value={published}
                onChange={(e) => setPublished(e.target.value)}
                required
              />
            </div>
            <div className="form-label-inputs">
              <label htmlFor="pages">Pages</label>
              <input
                type="text"
                placeholder="Pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                id="pages"
                required
              />
            </div>
            <div className="form-label-inputs">
              <label htmlFor="cover">Cover</label>
              <input
                type="file"
                placeholder="Cover"
                onChange={(e) => setCover(e.target.files[0])}
                id="cover"
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
