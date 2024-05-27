import { FaSearch } from "react-icons/fa";
import "./Books.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBooks,deleteBooks } from "./BookSlice/BookSlice";
import { useNavigate } from "react-router-dom";
const Books = () => {
  const dispatch = useDispatch()
  const {books,loading,error} = useSelector((state) => state.books)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchBooks())
  },[dispatch])

  if(loading) {
    return <div>Loading...</div>
  }
  if(error){
    return <div>{error}</div>
  }
  console.log(books);

  const handleAddClick = () => {
    navigate("/addbook")
  }

  const handleDeleteBooks = (id) => {
    dispatch(deleteBooks(id))
  }

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
        <button className="add-book" onClick={handleAddClick}>Add Book</button>
      </div>
      <div className="books-table">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Isbn</th>
              <th>Title</th>
              <th>Cover</th>
              <th>Author</th>
              <th>Published</th>
              <th>Pages</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>
                  <img src={book.cover} width={50} height={50} alt="Images" />
                </td>
                <td>{book.author}</td>
                <td>{book.published}</td>
                <td>{book.pages}</td>
                <td>
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={handleDeleteBooks(book.id)}>Delete</button>
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
