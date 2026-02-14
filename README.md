<div align="center">

# 📚 Quantum Literary Bookshelf

> A React bookshelf application featuring an animated quantum particle system where words decompose, transform, and recombine - visualizing language as living consciousness.

</div>

## 🌌 The Concept

This project creates a "living library of consciousness" where words exist as quantum particles in a literary universe. Letters break apart at the atomic level, disperse in circular patterns, drift through chaos where they morph and recombine, then coalesce into entirely new words - all connected by glowing threads representing quantum entanglement. There is no claim of being in expert in these fields of study. Inspiration merely was drawn from intriguing and revolutionary theories as a curious layperson.

**Mathematical foundation:** Experimentation with the Golden ratio (φ = 1.618...) for spatial harmony and Pi for circular distributions to generate (theoretically) naturally beautiful positioning. Each word has its own "personality" - philosophical terms move slowly, Chinese characters pulse larger, mystical words leave ethereal trails.

---

## 🎯 From Lab to Quantum Universe

**Started as:** General Assembly lab on Controlled Forms in React
Evolved into: An exploration of quantum physics visualization, advanced React patterns, SVG animation, and multilingual poetry—developed collaboratively with Claude AI as a learning tool and creative partner.

**Evolved into:** This project is being submitted late, but the extra time has been spent genuinely trying to understand the code rather than just making it work. I'm still actively studying many of these concepts—React performance optimization, mathematical animation, SVG manipulation—and revisiting sections to deepen my comprehension. The quantum animation system, in particular, uses patterns that initially felt beyond my reach, and honestly, some still do. It's an arduous part of the learning process: submitting work that challenges you while acknowledging there's still more to understand.

**Core Requirements Met:**

- ✅ Component with `useState` for state management
- ✅ Controlled form with `handleInputChange` and `handleSubmit`
- ✅ Dynamic rendering with `.map()`
- ✅ Books array with title and author fields

---

## 📸 Screenshots

The app comes in three visual themes:

### 🖤 Black & White Theme

| Home                                         | Bookshelf                                         | Add Book                                        |
| -------------------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| ![Home BNW](./screenshots/home-page-bnw.png) | ![Bookshelf BNW](./screenshots/bookshelf-bnw.png) | ![Add Book BNW](./screenshots/add-book-bnw.png) |

| Search                                      | Edit                                    | View                                    |
| ------------------------------------------- | --------------------------------------- | --------------------------------------- |
| ![Search BNW](./screenshots/search-bnw.png) | ![Edit BNW](./screenshots/edit-bnw.png) | ![View BNW](./screenshots/view-bnw.png) |

| Add Notes                                         | No Matches                                          |
| ------------------------------------------------- | --------------------------------------------------- |
| ![Add Notes BNW](./screenshots/add-notes-bnw.png) | ![No Matches BNW](./screenshots/no-matches-bnw.png) |

---

### 🌊 Color Theme (Default)

| Home                                        | Bookshelf                                             | Add Book                                            |
| ------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| ![Home Color](./screenshots/home-color.png) | ![Bookshelf Color](./screenshots/bookshelf-color.png) | ![Add Book Color](./screenshots/add-book-color.png) |

| Search                                          | Edit                                        | View                                        |
| ----------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| ![Search Color](./screenshots/search-color.png) | ![Edit Color](./screenshots/edit-color.png) | ![View Color](./screenshots/view-color.png) |

| No Matches                                              |
| ------------------------------------------------------- |
| ![No Matches Color](./screenshots/no-matches-color.png) |

---

### ☀️ Light Mode Theme

| Home                                        | Bookshelf                                             | Add Book                                            |
| ------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| ![Home Light](./screenshots/home-light.png) | ![Bookshelf Light](./screenshots/bookshelf-light.png) | ![Add Book Light](./screenshots/add-book-light.png) |

| Add Notes                                             | Edit                                        | View                                        |
| ----------------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| ![Add Notes Light](./screenshots/add-notes-light.png) | ![Edit Light](./screenshots/edit-light.png) | ![View Light](./screenshots/view-light.png) |

| No Matches                                              |
| ------------------------------------------------------- |
| ![No Matches Light](./screenshots/no-matches-light.png) |

---

## ✨ Key Features

### 1. **Quantum Animated Background**

- **21 multilingual word sequences** (English, Spanish, Chinese, esoteric terms)
- **Letter-level particle physics** with four animation phases:
  1. Formation (0-30%): Letters spiral in
  2. Stable (30-60%): Gentle quantum drift
  3. Dispersion (60-75%): Circular scatter patterns
  4. Chaos (75-100%): Letters morph into new words
- **Performance optimized** with `useMemo` and `useCallback`
- **Accessibility** with `prefers-reduced-motion` support

### 2. **Interactive Bookshelf**

- Progressive disclosure UI with collapsible sections
- Grid layout that expands from 150px to 250px cards
- Glassmorphism styling with backdrop blur
- Hover effects with neon cyan glow

### 3. **Controlled Form Pattern**

```javascript
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewBook({ ...newBook, [name]: value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  setBooks([...books, newBook]);
  setNewBook({ title: "", author: "" });
};
```

---

## 🛠️ Tech Stack

- **React 18** - Hooks (useState, useEffect, useMemo, useCallback)
- **Vite** - Build tool
- **SVG** - Vector animations
- **CSS3** - Grid, Flexbox, glassmorphism

---

## 📁 Project Structure

```
controlled-forms-in-react-lab/
├── node_modules/
├── public/
│   ├── fonts/                 # Custom typography (7 font files)
│   ├── service-worker.js
│   └── vite.svg
├── screenshots/               # Documentation images
│   ├── add-book-form.png
│   ├── bookshelf-view.png
│   ├── expanded-view.png
│   └── home-page.png
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── BookCard/
│   │   │   ├── BookCard.css
│   │   │   └── BookCard.jsx
│   │   ├── BookForm/
│   │   │   ├── BookForm.css
│   │   │   └── BookForm.jsx
│   │   ├── Bookshelf/
│   │   │   ├── Bookshelf.css
│   │   │   └── Bookshelf.jsx
│   │   ├── GeometricBg/       # Quantum animation system
│   │   │   ├── GeometricBg.css
│   │   │   └── GeometricBg.jsx
│   │   └── ToggleButton/
│   │       ├── ToggleButton.css
│   │       └── ToggleButton.jsx
│   ├── utils/
│   │   └── formHandlers.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 🚀 Getting Started

```bash
# Clone and install
git clone https://github.com/yourusername/quantum-bookshelf.git
cd quantum-bookshelf
npm install

# Development
npm run dev          # Start dev server at localhost:5173

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🎨 Design Philosophy

**Glassmorphism Aesthetic**

- Transparent backgrounds with frosted glass blur
- Neon accents (cyan #00fff2, teal #5DB4A6)
- Layered shadows for depth

**Mathematical Inspiration**

- Golden ratio for spatial harmony
- Quantum mechanics analogies (non-locality, uncertainty)
- String theory curved connections
- Trigonometric functions for organic motion

---

## 📖 Key Learning Outcomes

**React Fundamentals**

- State management and controlled forms
- Component composition and event handling
- Performance optimization with memoization
- Accessibility considerations

**Advanced Concepts**

- SVG animation with React
- Mathematical programming (golden ratio, trigonometry)
- Modern CSS (grid, glassmorphism, fluid typography)
- Particle systems and physics simulation

---

## 🎯 Future Enhancements

- [ ] LocalStorage for data persistence
- [ ] Delete and edit book functionality
- [ ] Search and filter capabilities
- [ ] Book cover image uploads
- [ ] Dark/light theme toggle
- [ ] Export to PDF/CSV

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- Additional multilingual word sequences
- Performance optimizations
- Accessibility enhancements
- Bug fixes

---

## 📝 License

MIT License - free to use for learning and inspiration!

---

## 🙏 Credits

**Assignment:** General Assembly - Software Engineering Immersive  
**Inspiration:** Quantum mechanics, string theory, golden ratio, hypnagogic states  
**Fonts:** Lamoric Rowen, Orbitron, Dune Rise, Creato Display

---

**From a simple form lab to a quantum literary cosmos** ✨

Built with React, assisted and refined with Claude AI and an exploratory creative, digital interpretation on how language lives and breathes, somewhere in the either.
