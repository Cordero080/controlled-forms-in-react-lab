import { useState, useEffect } from 'react';
import { createInputChangeHandler, createSubmitHandler } from '../../utils/formHandlers';
import './BookForm.css';

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                             BOOK FORM COMPONENT                              ║
║                                                                               ║
║  THEORY: A controlled form component that manages book input state          ║
║  ANALOGY: Like a form you fill out to add a new book to the library         ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

const BookForm = ({ onBookAdd }) => {
  /*
   * PROPS:
   * - onBookAdd: Function to call when a book is successfully added
   */

  // 📝 FORM STATE
  // Temporary storage for the book being added
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '' });

  // ❌ FORM ERRORS STATE
  const [formErrors, setFormErrors] = useState([]);

  // ERROR FADE STATE
  const [isFadingOut, setIsFadingOut] = useState(false);

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!newBook.title.trim() || !newBook.author.trim() || !newBook.genre.trim()) {
      setFormErrors(['All fields are required']);
      return;
    }
    
    // Clear errors
    setFormErrors([]);
    
    // Add book
    onBookAdd(newBook);
    
    // Reset form
    setNewBook({ title: '', author: '', genre: '' });
  };

  // AUTO-CLEAR ERRORS EFFECT
  useEffect(() => {
    if (formErrors.length > 0) {
      // Start fade-out animation 0.5 seconds before clearing
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2500);

      // Clear errors after full 3 seconds
      const clearTimer = setTimeout(() => {
        setFormErrors([]);
        setIsFadingOut(false);
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    } else {
      setIsFadingOut(false);
    }
  }, [formErrors]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* CONTROLLED INPUTS - React Controls the Value */}
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

        <label htmlFor="genre">Genre:</label>
        <select
          id="genre"
          name="genre"
          value={newBook.genre}
          onChange={handleInputChange}
          className="genre-dropdown"
        >
          <option value="">Select a genre...</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Biography">Biography</option>
          <option value="Martial Arts">Martial Arts</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Poetry">Poetry</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Theology">Theology</option>
          <option value="Psychology">Psychology</option>
        </select>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="submitButton">
          Add Book to Shelf
        </button>
      </form>


      {/* ERROR POPUP BUBBLE */}
      {formErrors.length > 0 && (
        <div className="errorPopup">
          <div className={`errorBubble ${isFadingOut ? 'fadeOut' : ''}`}>
            {formErrors.map((error, index) => (
              <p key={index} className="errorText">
                ⚠️ {error}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookForm;