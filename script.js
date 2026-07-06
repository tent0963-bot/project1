// Sample Mock Database Records
const initialBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://unsplash.com" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://unsplash.com" },
    { title: "1984", author: "George Orwell", cover: "https://unsplash.com" }
];

// Memory References
let libraryCollection = [...initialBooks];

// DOM Element Handlers
const bookshelf = document.getElementById('bookshelf');
const searchBar = document.getElementById('searchBar');
const bookModal = document.getElementById('bookModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const bookForm = document.getElementById('bookForm');

// Render Catalog Interface Layout
function displayBooks(booksToRender) {
    bookshelf.innerHTML = "";
    if (booksToRender.length === 0) {
        bookshelf.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d;">No matching literary items discovered.</p>`;
        return;
    }
    
    booksToRender.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.cover}" alt="${book.title} Catalog Cover" onerror="this.src='https://unsplash.com'">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
            </div>
        `;
        bookshelf.appendChild(card);
    });
}

// Local Search Filters
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCollection = libraryCollection.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredCollection);
});

// Structural Window Modal Toggles
openModalBtn.onclick = () => bookModal.style.display = "flex";
closeModalBtn.onclick = () => bookModal.style.display = "none";
window.onclick = (e) => { if (e.target === bookModal) bookModal.style.display = "none"; };

// Record Insertion Event Hooks
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBook = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        cover: document.getElementById('bookCover').value
    };
    
    libraryCollection.unshift(newBook); // Prepend entry
    displayBooks(libraryCollection);
    bookForm.reset();
    bookModal.style.display = "none";
});

// Initialize System Call UI Frame
displayBooks(libraryCollection);
