import { useState,useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);

  async function getBooks() {
    try {
      const data = await fetch("http://localhost:8000/books");
      const res = await data.json();
      setBooks(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Categories: {book.category.map((category) => category.categoryId).join(', ')}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
