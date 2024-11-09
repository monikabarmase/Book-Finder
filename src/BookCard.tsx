import React from "react";
import "./BookCard.css";

type BookCardProps = {
  book: {
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
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;

  return (
    <div className="book-card">
      {imageLinks && imageLinks.thumbnail && (
        <img src={imageLinks.thumbnail} alt={title} className="book-image" />
      )}
      <div className="book-details">
        <h3>{title}</h3>
        <p className="author">
          {authors ? authors.join(", ") : "Unknown Author"}
        </p>
        <p className="description">
          {description
            ? description.slice(0, 150) + "..."
            : "No description available"}
        </p>
        <button onClick={() => alert(`You clicked on: ${title}`)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
