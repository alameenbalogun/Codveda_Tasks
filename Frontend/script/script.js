// DOM Elements
const cards = document.querySelectorAll(".card");
const favoritesList = document.getElementById("favorites-list");
const modal = document.getElementById("quote-modal");
const modalQuote = document.getElementById("modal-quote");
const modalAuthor = document.getElementById("modal-author");
const closeModal = document.getElementById("close-modal");
const modalNewBtn = document.getElementById("modal-new-btn");
const modalLikeBtn = document.getElementById("modal-like-btn");

// Sample quotes data (fallback)
const defaultQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Career",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Mindset",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: "Perseverance",
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
    category: "Productivity",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Perseverance",
  },
];

let currentQuotes = [...defaultQuotes];
let currentModalQuote = null;
let activeCardIndex = 0;
let startX = 0;
let currentX = 0;

// Initialize the board with quotes
function initializeBoard() {
  // Load favorites from localStorage
  displayFavorites();

  // Add click events to cards
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.classList.contains("card-btn")) {
        setActiveCard(parseInt(card.dataset.index));
        openModal(currentQuotes[parseInt(card.dataset.index)]);
      }
    });

    // Add touch events for swipe
    card.addEventListener("touchstart", handleTouchStart, false);
    card.addEventListener("touchmove", handleTouchMove, false);
    card.addEventListener("touchend", handleTouchEnd, false);
  });

  // Try to fetch new quotes on load
  fetchAllNewQuotes();
}

// Touch event handlers for swipe
function handleTouchStart(evt) {
  const touch = evt.touches[0];
  startX = touch.clientX;
  currentX = startX;
}

function handleTouchMove(evt) {
  if (!startX) return;

  const touch = evt.touches[0];
  currentX = touch.clientX;
}

function handleTouchEnd(evt) {
  if (!startX) return;

  const diffX = currentX - startX;

  // If swipe is significant enough
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // Swipe right - previous card
      navigateStack("prev");
    } else {
      // Swipe left - next card
      navigateStack("next");
    }
  }

  // Reset values
  startX = 0;
  currentX = 0;
}

// Navigate through the stack
function navigateStack(direction) {
  let newIndex;

  if (direction === "next") {
    newIndex = (activeCardIndex + 1) % cards.length;
  } else {
    newIndex = (activeCardIndex - 1 + cards.length) % cards.length;
  }

  setActiveCard(newIndex);
}

// Set active card
function setActiveCard(index) {
  cards.forEach((card) => card.classList.remove("active"));
  cards[index].classList.add("active");
  activeCardIndex = index;
}

// Fetch a random quote from API
async function fetchNewQuote() {
  try {
    const res = await fetch(
      "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"
    );
    if (!res.ok) throw new Error("API request failed");

    const [data] = await res.json();
    return {
      text: data.q,
      author: data.a,
      category: "API",
    };
  } catch (error) {
    // Fallback to local quotes if API fails
    const localQuotes = [...defaultQuotes];
    return localQuotes[Math.floor(Math.random() * localQuotes.length)];
  }
}

// Replace a quote
async function getNewQuote(index) {
  event.stopPropagation(); // Prevent card click event

  const newQuote = await fetchNewQuote();
  currentQuotes[index] = newQuote;

  updateCardContent(index, newQuote);
}

// Update card content
function updateCardContent(index, quote) {
  const card = cards[index];
  card.querySelector(".card-quote").textContent = `"${quote.text}"`;
  card.querySelector(".card-author").textContent = `- ${quote.author}`;
}

// Fetch new quotes for all cards
async function fetchAllNewQuotes() {
  for (let i = 0; i < cards.length; i++) {
    const newQuote = await fetchNewQuote();
    currentQuotes[i] = newQuote;
    updateCardContent(i, newQuote);
  }
}

// Shuffle the stack order
function shuffleStack() {
  // Create an array of indices and shuffle them
  const indices = [...Array(cards.length).keys()];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Apply new z-index order
  indices.forEach((cardIndex, zIndex) => {
    cards[cardIndex].style.zIndex = cards.length - zIndex;
  });
}

// Add quote to favorites
function addToFavorites(index) {
  event.stopPropagation(); // Prevent card click event

  const quote = currentQuotes[index];
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Prevent duplicate entries
  if (!favorites.some((fav) => fav.text === quote.text)) {
    favorites.push(quote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();

    // Show confirmation
    alert(`"${quote.text}" added to favorites!`);
  } else {
    alert("This quote is already in your favorites!");
  }
}

// Display favorites from localStorage
function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML =
      "<p style='text-align: center; grid-column: 1 / -1; padding: 30px;'>No favorites yet. Like a quote to add it here!</p>";
    return;
  }

  favorites.forEach((fav, index) => {
    const favoriteItem = document.createElement("div");
    favoriteItem.className = "favorite-item";
    favoriteItem.innerHTML = `
                          <p style="font-size: 1.2rem; margin-bottom: 15px; font-style: italic;">"${fav.text}"</p>
                          <p style="font-weight: 600; text-align: right; color: #4361ee;">- ${fav.author}</p>
                          <button class="card-btn like-btn" style="margin-top: 20px; width: 100%;" onclick="removeFavorite(${index})">Remove</button>
                      `;
    favoritesList.appendChild(favoriteItem);
  });
}

// Remove quote from favorites
function removeFavorite(index) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

// Open modal with quote details
function openModal(quote) {
  currentModalQuote = quote;
  modalQuote.textContent = `"${quote.text}"`;
  modalAuthor.textContent = `- ${quote.author}`;
  modal.style.display = "flex";
}

// Close modal
function closeModalHandler() {
  modal.style.display = "none";
}

// Event listeners
closeModal.addEventListener("click", closeModalHandler);

modalNewBtn.addEventListener("click", async function () {
  const newQuote = await fetchNewQuote();
  openModal(newQuote);
  currentQuotes[activeCardIndex] = newQuote;
  updateCardContent(activeCardIndex, newQuote);
});

modalLikeBtn.addEventListener("click", function () {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.some((fav) => fav.text === currentModalQuote.text)) {
    favorites.push(currentModalQuote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
    alert(`"${currentModalQuote.text}" added to favorites!`);
  } else {
    alert("This quote is already in your favorites!");
  }
});

// Close modal when clicking outside the content
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModalHandler();
  }
});

// Initialize the board when page loads
document.addEventListener("DOMContentLoaded", initializeBoard);
