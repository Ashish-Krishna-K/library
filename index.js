var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a;
var _b, _Library_lib;
const addBookBtn = document.querySelector('button.add-book');
const titleInput = document.querySelector('input#title');
const authorInput = document.querySelector('input#author');
const pagesInput = document.querySelector('input#pages');
const readStatusInput = document.querySelector('input#read-status');
const submitBtn = document.querySelector('button.submit');
const cancelBtn = document.querySelector('button.cancel');
const addBookModal = document.querySelector('div.modal');
const displayBooksDiv = document.querySelector('div.display-books-wrapper');
class Library {
    // Create a addBookToLibrary function
    static addBookToLibrary(book) {
        __classPrivateFieldGet(this, _b, "f", _Library_lib).push(book);
    }
    // Create a removeBookFromLibrary function
    static removeBookFromLibrary(bookIndex) {
        __classPrivateFieldGet(this, _b, "f", _Library_lib).splice(bookIndex, 1);
    }
    // Create a getter function
    static get library() {
        return __classPrivateFieldGet(this, _b, "f", _Library_lib).slice();
    }
}
_b = Library;
// Create a library array
_Library_lib = { value: [] };
class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.numOfPages = pages;
        this.isRead = readStatus;
    }
    toggleReadStatus() {
        this.isRead = !this.isRead;
    }
}
// Create a render function to handle rhe re-render
const resetDisplayDiv = () => {
    // A helper function to remove all current childNodes
    // from displayBooksDiv
    displayBooksDiv.replaceChildren();
};
const createBookCard = (book, index) => {
    // A helper function that creates a div element for the 
    // book object passed as argument and returns the newly
    // create book-card div
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    const titleDisplay = document.createElement('p');
    titleDisplay.classList.add('book-title');
    titleDisplay.textContent = `"${book.title}"`;
    bookDiv.appendChild(titleDisplay);
    const authorDisplay = document.createElement('p');
    authorDisplay.classList.add('book-author');
    authorDisplay.textContent = book.author;
    bookDiv.appendChild(authorDisplay);
    const pagesDisplay = document.createElement('p');
    pagesDisplay.classList.add('book-pages');
    pagesDisplay.textContent = book.numOfPages + ' pages';
    bookDiv.appendChild(pagesDisplay);
    const readStatusDisplay = document.createElement('button');
    readStatusDisplay.classList.add('read-status-btn');
    readStatusDisplay.value = index;
    if (book.isRead) {
        readStatusDisplay.classList.add('book-read');
        readStatusDisplay.classList.remove('book-notread');
        readStatusDisplay.textContent = "READ";
    }
    else {
        readStatusDisplay.classList.add('book-notread');
        readStatusDisplay.classList.remove('book-read');
        readStatusDisplay.textContent = "NOT READ";
    }
    readStatusDisplay.addEventListener("click", (ev) => {
        const target = ev.target;
        changeBookReadStatus(Number(target.value));
        render();
    });
    bookDiv.appendChild(readStatusDisplay);
    const removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('delete-book');
    removeBookBtn.value = index;
    removeBookBtn.addEventListener("click", (ev) => {
        Library.removeBookFromLibrary(parseInt(ev.target.value));
        render();
    });
    removeBookBtn.textContent = "Remove";
    bookDiv.appendChild(removeBookBtn);
    bookDiv.setAttribute('data-index', index);
    return bookDiv;
};
const render = () => {
    resetDisplayDiv();
    Library.library.forEach((book, index) => {
        const bookCard = createBookCard(book, index.toString());
        displayBooksDiv.appendChild(bookCard);
    });
};
// Create a function to edit the bookReadStatus
const changeBookReadStatus = (bookIndex) => {
    Library.library[bookIndex].toggleReadStatus();
};
// Create a function that clears all the input elemnts to it's default
// value
const clearForm = () => {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatusInput.checked = false;
};
const handleCancelBtnClick = () => {
    addBookModal.classList.add('hidden');
};
addBookBtn.addEventListener("click", () => {
    addBookModal.classList.remove('hidden');
});
cancelBtn.addEventListener("click", handleCancelBtnClick);
addBookModal.addEventListener("click", handleCancelBtnClick);
(_a = document.querySelector('form#add-book-form')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (ev) => {
    ev.stopPropagation();
});
submitBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (titleInput.value === '' || authorInput.value === '' || pagesInput.value === '')
        return;
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatusInput.checked);
    Library.addBookToLibrary(newBook);
    clearForm();
    render();
    handleCancelBtnClick();
});
render();
