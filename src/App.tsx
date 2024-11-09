import "./styles.css";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import "./App.css";
import BookCard from "./BookCard";

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle search
  const searchBooks = async (event: FormEvent) => {
    event.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes`,
        {
          params: { q: searchQuery },
        }
      );
      setBooks(response.data.items || []);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Search</h1>
        <form onSubmit={searchBooks}>
          <input
            type="text"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
