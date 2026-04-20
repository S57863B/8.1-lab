# Minimalist Flashcard App

A sleek, dark-themed flashcard application built with vanilla HTML5, CSS3, and JS. This app provides a simple and effective way to create study decks, add flashcards, and test your knowledge without any external dependencies.

## Features

- **Deck Management:** Create, edit, and delete custom flashcard decks.
- **Card Management:** Add, edit, and delete individual cards (front/back) within your selected deck.
- **Study Mode:** Flip cards to reveal answers and navigate through your deck using "Prev" and "Next" controls.
- **Modern UI:** A clean, dark-themed interface with smooth 3D flip animations and modal dialogs.
- **Local Execution:** Runs entirely in the browser. No server or database setup required.

## File Structure

The project is divided into three core files for maintainability:

* `index.html`: Contains the structural markup, including the main layout, sidebar, flashcard container, and modal windows.
* `styles.css`: Handles the dark theme aesthetics, responsive design, interactive hover states, and the 3D CSS transform logic for flipping the cards.
* `app.js`: Manages the application state (decks, cards, current selection) and handles all user interactions and DOM updates.

## Installation & Usage
Use deployed site - https://s57863b.github.io/8.1-lab/

OR

1. Clone or download the repository to your local machine.
2. Ensure `index.html`, `styles.css`, and `app.js` are in the same folder.
3. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
4. **Getting Started:**
    * Click **New Deck** to create your first study category.
    * Select your new deck from the sidebar.
    * Click **Add Card** to create a new flashcard with a front and back side.
    * Click the card or use the **Flip** button to study!

## Technologies Used

- **HTML5**
- **CSS3** (Flexbox, CSS Variables, 3D Transforms)
- **Vanilla JavaScript** (ES6+)