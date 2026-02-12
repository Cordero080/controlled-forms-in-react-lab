import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BookCard.css';

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                             BOOK CARD COMPONENT                              ║
║                                                                               ║
║  THEORY: A "presentational component" - displays data without managing state ║
║  ANALOGY: Like a library card that shows book information                   ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

const BookCard = ({ book, onDelete, isEditMode, isSelected, hasSelection, onSelect, onEdit }) => {
  /*
   * PROPS: Data passed down from parent component
   * ANALOGY: Like receiving a filled-out library card
   * - book: Object containing title, author, and genre
   * - onDelete: Function to delete this book
   * - isEditMode: Boolean indicating if edit mode is active
   * - isSelected: Boolean indicating if this book is selected for editing
   * - hasSelection: Boolean indicating if any book is currently selected
   * - onSelect: Function to select this book for editing
   * - onEdit: Function to save edited book data
   */

  const [notes, setNotes] = useState(book.notes || '');
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Blur background when book details modal is open
  useEffect(() => {
    if (showDetails) {
      document.body.classList.add('details-modal-open');
    } else {
      document.body.classList.remove('details-modal-open');
    }
    return () => document.body.classList.remove('details-modal-open');
  }, [showDetails]);

  // Add/remove body class when notes modal is open to blur background
  useEffect(() => {
    if (showNotesInput) {
      document.body.classList.add('notes-modal-open');
    } else {
      document.body.classList.remove('notes-modal-open');
    }
    return () => document.body.classList.remove('notes-modal-open');
  }, [showNotesInput]);

  const handleAddNotes = () => {
    onEdit({
      ...book,
      notes: notes
    });
    setShowNotesInput(false);
  };

  // Determine the CSS class based on state
  // Show edit-mode highlight only when: in edit mode AND (no selection yet OR this card is selected)
  const showEditHighlight = isEditMode && (!hasSelection || isSelected);
  const cardClass = `bookCard ${showEditHighlight ? 'edit-mode' : ''} ${isSelected ? 'selected' : ''}`;

  // Handle card click - select card and stop propagation to prevent deselect
  const handleCardClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to background
    if (isEditMode && !isSelected) {
      onSelect();
    }
  };

  return (
    <div className={cardClass} onClick={handleCardClick}>
      {/* Always show book info */}
      {book.title && <h3>{book.title}</h3>}
      {book.author && <p>{book.author}</p>}
      {book.genre && !showNotesInput && <span className="genre-tag">{book.genre}</span>}

      {/* Show View link only when NOT selected */}
      {!isSelected && book.title && book.author && book.genre && (
        <div className="card-links">
          <button className="edit-link" onClick={onSelect}>Edit</button>
          <button className="view-link" onClick={() => setShowDetails(true)}>View</button>
        </div>
      )}

      {/* Show edit options when selected */}
      {isSelected && (
        <div className="edit-form" onClick={e => e.stopPropagation()}>
          {!showNotesInput ? (
            <>
              <div className="edit-options">
                <button className="option-button remove-button" onClick={onDelete}>Remove</button>
                <button className="option-button notes-button" onClick={() => setShowNotesInput(true)}>
                  <span className="plus-sign">+</span> Notes
                </button>
                <button className="option-button cancel-edit-button" onClick={() => {
                  // Exit edit mode and deselect book
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('cancelEditMode');
                    window.dispatchEvent(event);
                  }
                }}>Cancel</button>
              </div>
            </>
          ) : (
            createPortal(
              <div className="notes-modal-portal">
                <div className="notes-backdrop" onClick={() => setShowNotesInput(false)} />
                <div className="notes-form-container" onClick={(e) => e.stopPropagation()}>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="cosmic-input holographic-notes-bg notes-input"
                    placeholder="Add your notes about this book..."
                    rows="3"
                    autoFocus
                  />
                  <div className="notes-buttons">
                    <button className="save-notes-button" onClick={handleAddNotes}>Save</button>
                    <button className="cancel-notes-button" onClick={() => setShowNotesInput(false)}>Cancel</button>
                  </div>
                </div>
              </div>,
              document.body
            )
          )}
        </div>
      )}

      {/* Book details modal as portal */}
      {showDetails && createPortal(
        <div className="details-modal-portal">
          <div className="details-backdrop" onClick={() => setShowDetails(false)} />
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowDetails(false)}>×</button>
            <h2 className="details-title">{book.title}</h2>
            <p className="details-author"><strong>Author:</strong> {book.author}</p>
            <p className="details-genre"><strong>Genre:</strong> {book.genre}</p>
            {book.notes && (
              <div className="book-notes">
                <h3>Notes:</h3>
                <p>{book.notes}</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default BookCard;