import { useState } from 'react';
import './Bookshelf.css';

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                           BOOKSHELF COMPONENT                                 ║
║                                                                               ║
║  THEORY: This is a "stateful component" - like a living notebook that React  ║
║  updates automatically when things change. It manages a collection of books   ║
║  and a form to add new ones.                                                  ║
║                                                                               ║
║  ANALOGY: Think of this component as a librarian who:                        ║
║  - Remembers all the books on the shelf (useState for books array)           ║
║  - Remembers what book you're currently writing down (useState for newBook)  ║
║  - Can show/hide the bookshelf or form (useState for visibility toggles)     ║
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

  // 📝 NEW BOOK STATE
  // Temporary storage for the book being added
  // ANALOGY: Like a blank form you fill out before filing it away
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  
  // 👁️ VISIBILITY TOGGLES
  // Boolean (true/false) states that control what's shown
  // ANALOGY: Like light switches - on/off for different sections
  const [isFormVisible, setIsFormVisible] = useState(false);      // Form hidden by default
  const [isBookshelfVisible, setIsBookshelfVisible] = useState(false); // Shelf hidden
  const [isExpanded, setIsExpanded] = useState(false);            // Shelf starts collapsed

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. EVENT HANDLER FUNCTIONS - The Component's Behaviors
  // ═══════════════════════════════════════════════════════════════════════════
  
  /*
   * WHAT ARE EVENT HANDLERS?
   * Functions that respond to user actions (clicks, typing, etc.)
   * ANALOGY: Like reflexes - when you touch something hot (event), 
   * you pull your hand back (handler function)
   */
  
  // 📝 HANDLE INPUT CHANGE
  // Updates the newBook state as user types in form fields
  const handleInputChange = (e) => {
    // e (event object) contains info about what happened
    // e.target is the input field that triggered this
    const { name, value } = e.target; // Destructure name and value from the input
    
    /*
     * SPREAD OPERATOR EXPLANATION: { ...newBook, [name]: value }
     * Think of it like photocopying a form, then changing one field:
     * 1. ...newBook = "copy everything from the old form"
     * 2. [name]: value = "update just this one field with new value"
     * 
     * Example: If user types "Dune" in title field:
     * - name = "title"
     * - value = "Dune"
     * - Result: { title: 'Dune', author: '' } (author unchanged)
     */
    setNewBook({ ...newBook, [name]: value });
  };

  // ✅ HANDLE FORM SUBMIT
  // Adds the new book to the books array when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Stops page from reloading (default form behavior)
    
    /*
     * ADDING TO ARRAY: [...books, newBook]
     * ANALOGY: Imagine books is a stack of cards. This:
     * 1. Spreads out all existing cards (...books)
     * 2. Adds new card on top (newBook)
     * 3. Creates a brand new stack with everything
     * 
     * WHY NOT books.push()? 
     * React needs a NEW array to detect the change and re-render.
     * Modifying the old array directly won't trigger updates.
     */
    setBooks([...books, newBook]);
    
    // Reset the form to empty (like erasing the blank form)
    setNewBook({ title: '', author: '' });
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
      <h3
        className="bookshelf-title"
        // onClick HANDLER: Toggles visibility when clicked
        // ! means "NOT" - so it flips true↔false
        onClick={() => setIsBookshelfVisible(!isBookshelfVisible)}
        
        // CONDITIONAL STYLING: Color changes based on state
        // TERNARY OPERATOR: condition ? valueIfTrue : valueIfFalse
        style={{ color: isBookshelfVisible ? '#5DB4A6' : '#f1e9f4e2' }}
      >
        {/* CONDITIONAL TEXT: Shows different text based on state */}
        {isBookshelfVisible ? 'Unveil the Bookshelf ▲' : 'ENTER  BOOKSHELF ▼'}
      </h3>
      
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
            
            {books.map((book, index) => (
              <div key={index} className="bookCard">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
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
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ADD BOOK FORM SECTION */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="formDiv">
        <h3 className="add-book" onClick={() => setIsFormVisible(!isFormVisible)}>
          Add a Book <span>{isFormVisible ? '▲' : '▼'}</span>
        </h3>
        
        {/* CONDITIONAL FORM RENDERING */}
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            
            {/* CONTROLLED INPUTS - React Controls the Value */}
            
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"              // Used by handleInputChange to know which field
              value={newBook.title}     // React-controlled value
              onChange={handleInputChange} // Updates state on every keystroke
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