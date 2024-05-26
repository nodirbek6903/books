import { FaSearch } from "react-icons/fa";
import "./Books.css";
const Books = () => {
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
        <button className="add-book">Add Book</button>
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
            <tr>
              <td>1</td>
              <td>9781118464465</td>
              <td>Raspberry Pi User Guide</td>
              <td>
                <img
                  src="http://url.to.book.cover"
                  width={50}
                  height={50}
                  alt="Images"
                />
              </td>
              <td>Eben Upton</td>
              <td>2012</td>
              <td>221</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>9781118464465</td>
              <td>Raspberry Pi User Guide</td>
              <td>
                <img
                  src="http://url.to.book.cover"
                  width={50}
                  height={50}
                  alt="Images"
                />
              </td>
              <td>Eben Upton</td>
              <td>2012</td>
              <td>221</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>9781118464465</td>
              <td>Raspberry Pi User Guide</td>
              <td>
                <img
                  src="http://url.to.book.cover"
                  width={50}
                  height={50}
                  alt="Images"
                />
              </td>
              <td>Eben Upton</td>
              <td>2012</td>
              <td>221</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
