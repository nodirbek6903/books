import {Routes,Route} from "react-router-dom"
import Books from './components/Books/Books';
import Register from "./auth/Register/Register";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
    </>
  )
}

export default App
