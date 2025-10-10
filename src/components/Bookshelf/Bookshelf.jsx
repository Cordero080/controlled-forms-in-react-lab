import { useState } from 'react';
import BookCard from '../BookCard/BookCard';
import BookForm from '../BookForm/BookForm';
import ToggleButton from '../ToggleButton/ToggleButton';
import './Bookshelf.css';

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                           BOOKSHELF COMPONENT                                 ║
║                                                                               ║
║  THEORY: This is a "stateful component" - like a living notebook that React  ║
║  updates automatically when things change. It manages a collection of books   ║
║  and orchestrates child components for display and form handling.            ║
║                                                                               ║
║  ANALOGY: Think of this component as a librarian who:                        ║
║  - Remembers all the books on the shelf (useState for books array)           ║
║  - Manages visibility of different sections (useState for toggles)           ║
║  - Coordinates between BookCard, BookForm, and ToggleButton components       ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

const Bookshelf = () => {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. STATE VARIABLES - React's Memory System
  // ═══════════════════════════════════════════════════════════════════════════
  
  /*
   * WHAT IS useState?
   * Think of it as React's "memory notebook". Each useState creates a variable
   * that React "watches" - when it changes, React automatically re-renders 
   * (redraws) the component.
   * 
   * Pattern: const [value, setValue] = useState(initialValue)
   * - value: Current state (like reading the notebook)
   * - setValue: Function to update state (like writing in the notebook)
   * - initialValue: Starting value
   */
  
  // 📚 BOOKS ARRAY STATE
  // Stores all books as an array of objects
  // ANALOGY: Like a list of index cards, each card has title & author
  const [books, setBooks] = useState([
    { 
      title: 'The Brothers Karamazov', 
      author: 'Fyodor Dostoyevsky',
      genre: 'Literary Fiction'
    },
    {
      title:'Zen and the Art of Motorcycle Maintenance',
      author: 'Gary Zukav',
      genre: 'Philosophy'
    },
    {
      title: 'The Lone Samurai',
      author: 'William Scott Wilson',
      genre: 'Biography'
    },
    {
      title: 'In my Own Way',
      author: 'Alan Watts',
      genre: 'Philosophy'
    },
    {
      title: 'The Book of Five Rings',
      author: 'Musashi Miyamoto',
      genre: 'Martial Arts'
    },
  ]);

  // 👁️ VISIBILITY TOGGLES
  // Boolean (true/false) states that control what's shown
  // ANALOGY: Like light switches - on/off for different sections
  const [isFormVisible, setIsFormVisible] = useState(false);      // Form hidden by default
  const [isBookshelfVisible, setIsBookshelfVisible] = useState(false); // Shelf hidden
  const [isExpanded, setIsExpanded] = useState(false);            // Shelf starts collapsed
  const [isEditMode, setIsEditMode] = useState(false);            // Edit mode starts disabled
  const [selectedBookIndex, setSelectedBookIndex] = useState(null); // Index of selected book for editing

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. EVENT HANDLER FUNCTIONS - The Component's Behaviors
  // ═══════════════════════════════════════════════════════════════════════════

  /*
   * WHAT ARE EVENT HANDLERS?
   * Functions that respond to user actions (clicks, typing, etc.)
   * ANALOGY: Like reflexes - when you touch something hot (event),
   * you pull your hand back (handler function)
   */

  // Handle adding a new book to the collection
  const handleBookAdd = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
    // Automatically show the bookshelf when a book is added
    setIsBookshelfVisible(true);
  };

  // Handle deleting a book from the collection
  const handleBookDelete = (indexToDelete) => {
    setBooks(prevBooks => prevBooks.filter((_, index) => index !== indexToDelete));
  };

  // Handle editing a book in the collection
  const handleBookEdit = (indexToEdit, updatedBook) => {
    setBooks(prevBooks => prevBooks.map((book, index) => 
      index === indexToEdit ? updatedBook : book
    ));
  };

  // Handle selecting a book for editing
  const handleBookSelect = (index) => {
    setSelectedBookIndex(index);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. JSX RETURN - The Component's Visual Structure
  // ═══════════════════════════════════════════════════════════════════════════
  
  /*
   * JSX is HTML-like syntax that describes what to render
   * ANALOGY: Like a blueprint that tells React what to build on screen
   */
  
  return (
    <div className="bookshelfContainer">
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BOOKSHELF TOGGLE TITLE */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ToggleButton
        isActive={isBookshelfVisible}
        onToggle={() => setIsBookshelfVisible(!isBookshelfVisible)}
        activeText="Unveil the Bookshelf ▲"
        inactiveText="ENTER  BOOKSHELF ▼"
        className="bookshelf-title"
      />
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CONDITIONAL RENDERING: Only shows if isBookshelfVisible is true */}
      {/* ANALOGY: Like a door - only shows what's inside when opened */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {isBookshelfVisible && (
        <div>
          
          {/* BOOKSHELF DIV with dynamic className */}
          {/* Template literal allows conditional class: 'expanded' added when isExpanded=true */}
          <div className={`bookshelfDiv ${isExpanded ? 'expanded' : ''}`}>
            
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ARRAY MAPPING - Rendering Lists in React */}
            {/* ═══════════════════════════════════════════════════════════ */}

            {books.map((book, index) => {
              console.log(`Rendering book ${index}:`, book);
              return (
                <BookCard 
                  key={index} 
                  book={book} 
                  onDelete={() => handleBookDelete(index)}
                  isEditMode={isEditMode}
                  isSelected={selectedBookIndex === index}
                  onSelect={() => handleBookSelect(index)}
                  onEdit={(updatedBook) => handleBookEdit(index, updatedBook)}
                />
              );
            })}
          </div>
          
          {/* EXPAND/COLLAPSE BUTTON */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="expandButton"
          >
            {isExpanded ? 'Collapse ▲' : 'Expand ▼'}
          </button>
          
          {/* EDIT MODE TOGGLE BUTTON */}
          <button 
            onClick={() => {
              setIsEditMode(!isEditMode);
              if (isEditMode) {
                setSelectedBookIndex(null); // Reset selection when exiting edit mode
              }
            }} 
            className="editButton"
          >
            {isEditMode ? 'exit' : 'edit'}
          </button>
        </div>
      )}
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ADD BOOK FORM SECTION */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="formDiv">
        <h3 className="add-book" onClick={() => setIsFormVisible(!isFormVisible)}>
          Add a Book <span>{isFormVisible ? '▲' : '▼'}</span>
        </h3>

        {/* CONDITIONAL FORM RENDERING */}
        {isFormVisible && (
          <BookForm onBookAdd={handleBookAdd} />
        )}
      </div>
    </div>
  );
};

export default Bookshelf;

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                         COMPONENT FLOW SUMMARY                                ║
╚══════════════════════════════════════════════════════════════════════════════╝

DATA FLOW (One-Way):
┌─────────────┐
│ User Action │  (click, type)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Event Handler│  (handleInputChange, handleSubmit, onClick)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Update State│  (setBooks, setNewBook, setIsVisible)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Re-Render   │  React updates the UI automatically
└─────────────┘

COMPONENT HIERARCHY:
Bookshelf (parent)
├── Title Toggle
├── Bookshelf Display (conditional)
│   ├── Book Cards (mapped from array)
│   └── Expand Button
└── Form Section (conditional)
    ├── Form Toggle
    └── Input Fields (controlled)

NO PROPS in this component - it's self-contained!
All data managed internally via useState.
*/