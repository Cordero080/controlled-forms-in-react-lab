import { useState } from 'react';
import './Bookshelf.css';

const Bookshelf = () => {
  // 1. State variables
  const [books, setBooks] = useState([
    { 
      title: 'The Brothers Karamazov', 
      author: 'Fyodor Dostoyevsky'
    },
    {
      title:'Zen and the Art of Motorcycle Maintenance',
      author: 'Gary Zukav'
    },
    {
      title: 'The Lone Samurai',
      author: 'William Scott Wilson'
    },
    {
      title: 'In my Own Way',
      author: 'Alan Watts'
    },
    {
      title: 'The Book of Five Rings',
      author: 'Musashi Miyamoto'
    },
  ]);

  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBookshelfVisible, setIsBookshelfVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Handler functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks([...books, newBook]);
    setNewBook({ title: '', author: '' });
  };

  return (
    <div className="bookshelfContainer">
      <h3
        className="bookshelf-title"
        onClick={() => setIsBookshelfVisible(!isBookshelfVisible)}
        style={{ color: isBookshelfVisible ? '#5DB4A6' : '#f1e9f4e2' }}
      >
        {isBookshelfVisible ? 'Unveil the Bookshelf ▲' : 'ENTER  BOOKSHELF ▼'}
      </h3>
      {isBookshelfVisible && (
        <div>
          <div className={`bookshelfDiv ${isExpanded ? 'expanded' : ''}`}>
            {books.map((book, index) => (
              <div key={index} className="bookCard">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="expandButton"
          >
            {isExpanded ? 'Collapse ▲' : 'Expand ▼'}
          </button>
        </div>
      )}
      <div className="formDiv">
        <h3 className="add-book" onClick={() => setIsFormVisible(!isFormVisible)}>
          Add a Book <span>{isFormVisible ? '▲' : '▼'}</span>
        </h3>
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
            />
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
            />
            <button type="submit">Add Book</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Bookshelf;