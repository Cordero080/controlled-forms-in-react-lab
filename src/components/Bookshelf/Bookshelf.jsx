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
    // FICTION (20)
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', genre: 'Literary Fiction' },
    { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', genre: 'Literary Fiction' },
    { title: 'Moby-Dick', author: 'Herman Melville', genre: 'Literary Fiction' },
    { title: 'Beloved', author: 'Toni Morrison', genre: 'Literary Fiction' },
    { title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Literary Fiction' },
    { title: 'Invisible Man', author: 'Ralph Ellison', genre: 'Literary Fiction' },
    { title: 'To the Lighthouse', author: 'Virginia Woolf', genre: 'Literary Fiction' },
    { title: 'Blood Meridian', author: 'Cormac McCarthy', genre: 'Literary Fiction' },
    { title: 'The Sound and the Fury', author: 'William Faulkner', genre: 'Literary Fiction' },
    { title: 'Catch-22', author: 'Joseph Heller', genre: 'Literary Fiction' },
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Literary Fiction' },
    { title: 'Middlemarch', author: 'George Eliot', genre: 'Literary Fiction' },
    { title: 'The Tale of Genji', author: 'Murasaki Shikibu', genre: 'Literary Fiction' },
    { title: "Gravity's Rainbow", author: 'Thomas Pynchon', genre: 'Literary Fiction' },
    { title: 'Anna Karenina', author: 'Leo Tolstoy', genre: 'Literary Fiction' },
    { title: 'Ulysses', author: 'James Joyce', genre: 'Literary Fiction' },
    { title: 'The Stranger', author: 'Albert Camus', genre: 'Literary Fiction' },
    { title: 'Infinite Jest', author: 'David Foster Wallace', genre: 'Literary Fiction' },
    { title: 'Things Fall Apart', author: 'Chinua Achebe', genre: 'Literary Fiction' },
    { title: '2666', author: 'Roberto Bolaño', genre: 'Literary Fiction' },
    // PHILOSOPHY (15)
    { title: 'Meditations', author: 'Marcus Aurelius', genre: 'Philosophy' },
    { title: 'The Republic', author: 'Plato', genre: 'Philosophy' },
    { title: 'Nicomachean Ethics', author: 'Aristotle', genre: 'Philosophy' },
    { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', genre: 'Philosophy' },
    { title: 'Being and Time', author: 'Martin Heidegger', genre: 'Philosophy' },
    { title: 'The Genealogy of Morals', author: 'Friedrich Nietzsche', genre: 'Philosophy' },
    { title: 'Critique of Pure Reason', author: 'Immanuel Kant', genre: 'Philosophy' },
    { title: 'Tao Te Ching', author: 'Lao Tzu', genre: 'Philosophy' },
    { title: 'The Phenomenology of Spirit', author: 'G.W.F. Hegel', genre: 'Philosophy' },
    { title: 'Either/Or', author: 'Søren Kierkegaard', genre: 'Philosophy' },
    { title: 'The Second Sex', author: 'Simone de Beauvoir', genre: 'Philosophy' },
    { title: 'The Gay Science', author: 'Friedrich Nietzsche', genre: 'Philosophy' },
    { title: 'Discipline and Punish', author: 'Michel Foucault', genre: 'Philosophy' },
    { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', genre: 'Philosophy' },
    { title: 'The Problems of Philosophy', author: 'Bertrand Russell', genre: 'Philosophy' },
    // NON-FICTION (15)
    { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction' },
    { title: 'The Denial of Death', author: 'Ernest Becker', genre: 'Non-Fiction' },
    { title: 'The Origin of Species', author: 'Charles Darwin', genre: 'Non-Fiction' },
    { title: 'The Autobiography of Malcolm X', author: 'Malcolm X & Alex Haley', genre: 'Non-Fiction' },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genre: 'Non-Fiction' },
    { title: "Man's Search for Meaning", author: 'Viktor Frankl', genre: 'Non-Fiction' },
    { title: 'The Structure of Scientific Revolutions', author: 'Thomas Kuhn', genre: 'Non-Fiction' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Non-Fiction' },
    { title: 'The Souls of Black Folk', author: 'W.E.B. Du Bois', genre: 'Non-Fiction' },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Non-Fiction' },
    { title: 'The Power Broker', author: 'Robert Caro', genre: 'Non-Fiction' },
    { title: 'The Warmth of Other Suns', author: 'Isabel Wilkerson', genre: 'Non-Fiction' },
    { title: 'The Guns of August', author: 'Barbara Tuchman', genre: 'Non-Fiction' },
    { title: 'The Emperor of All Maladies', author: 'Siddhartha Mukherjee', genre: 'Non-Fiction' },
    { title: 'The Wright Brothers', author: 'David McCullough', genre: 'Non-Fiction' },
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

  // Handle clicking outside of cards to deselect (while staying in edit mode)
  const handleBackgroundClick = (e) => {
    // Only deselect if in edit mode, a book is selected, and clicked on background
    if (isEditMode && selectedBookIndex !== null && e.target === e.currentTarget) {
      setSelectedBookIndex(null);
    }
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
        activeText="EXIT ▲"
        inactiveText="ENTER ▼"
        className="bookshelf-title"
      />
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CONDITIONAL RENDERING: Only shows if isBookshelfVisible is true */}
      {/* ANALOGY: Like a door - only shows what's inside when opened */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {isBookshelfVisible && (
        <div>
          
          {/* SUBTITLE AT TOP OF BOOKSHELF */}
          <p className="exit-subtitle">unveil the bookshelf</p>
          
          {/* BOOKSHELF DIV with dynamic className */}
          {/* Template literal allows conditional class: 'expanded' added when isExpanded=true */}
          <div 
            className={`bookshelfDiv ${isExpanded ? 'expanded' : ''} ${isEditMode ? 'edit-mode' : ''}`}
            onClick={handleBackgroundClick}
          >
            
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ARRAY MAPPING - Rendering Lists in React */}
            {/* ═══════════════════════════════════════════════════════════ */}

            {books.map((book, index) => (
              <BookCard 
                key={index} 
                book={book} 
                onDelete={() => handleBookDelete(index)}
                isEditMode={isEditMode}
                isSelected={selectedBookIndex === index}
                hasSelection={selectedBookIndex !== null}
                onSelect={() => handleBookSelect(index)}
                onEdit={(updatedBook) => handleBookEdit(index, updatedBook)}
              />
            ))}
          </div>
          
          {/* EXPAND/COLLAPSE BUTTON */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="expandButton"
          >
            {isExpanded ? 'Collapse ▲' : 'Expand ▼'}
          </button>
        </div>
      )}
      
      {/* FLOATING EDIT BUTTON - shows on right when not in edit mode and bookshelf is visible */}
      {isBookshelfVisible && !isEditMode && (
        <button 
          onClick={() => setIsEditMode(true)} 
          className="editButton floating-right"
        >
          ✎ EDIT
        </button>
      )}
      
      {/* FLOATING EXIT BUTTON - shows on right when in edit mode */}
      {isEditMode && (
        <button 
          onClick={() => {
            setIsEditMode(false);
            setSelectedBookIndex(null);
          }} 
          className="editButton floating-right exit"
        >
          ✕ EXIT
        </button>
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