import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [category, setCategory] = useState([])

  async function getBooks() {
    try {
      const data = await fetch("http://localhost:8000/books")
      const res = await data.json() 
      setBooks(res)
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      const data = await fetch("http://localhost:8000/categories")
      const res = await data.json() 
      setCategory(res)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks()
    getCategories()
  }, [])
  

  const getCategoryNamesForBook = (book) => {
    return book.category.map((categoryId) => {
      const foundCategory = category.find((category) => category._id === categoryId);
      return foundCategory ? foundCategory.name : '';
    });
  };

  return (
    <>
      <ul>
      {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Categories: {getCategoryNamesForBook(book).join(', ')}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
