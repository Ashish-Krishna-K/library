const addBookBtn = document.querySelector('button.add-book') as HTMLButtonElement;
const titleInput = document.querySelector('input#title') as HTMLInputElement;
const authorInput = document.querySelector('input#author') as HTMLInputElement;
const pagesInput = document.querySelector('input#pages') as HTMLInputElement;
const readStatusInput = document.querySelector('input#read-status') as HTMLInputElement;
const submitBtn = document.querySelector('button.submit') as HTMLButtonElement;
const cancelBtn = document.querySelector('button.cancel') as HTMLButtonElement;
const addBookModal = document.querySelector('div.modal') as HTMLDivElement;
const displayBooksDiv = document.querySelector('div.display-books-wrapper') as HTMLDivElement;

// Create a library array
let library: Book[] = [];
// Create a book constructor
interface Book {
    title: string;
    author: string;
    numOfPages: number;
    isRead: boolean;
    toggleReadStatus(status: boolean): void;
}
const Book = function (this: Book, title: string, author: string, pages: number, readStatus: boolean) {
    this.title = title;
    this.author = author;
    this.numOfPages = pages;
    this.isRead = readStatus;
}
// Create a method on the book object to edit isRead field
Book.prototype.toggleReadStatus = function (status: boolean) {
    this.isRead = status;
}
// Create a addBookToLibrary function
const addBookToLibrary = (book: Book) => {
    library.push(book);
}
// Create a removeBookFromLibrary function
const removeBookFromLibrary = (bookIndex: number) => {
    library.splice(bookIndex, 1);
}
// Create a render function to handle rhe re-render
const resetDisplayDiv = () => {
    // A helper function to remove all current childNodes
    // from displayBooksDiv
    displayBooksDiv.replaceChildren();
}
const createBookCard = (book: Book, index: string) => {
    // A helper function that creates a div element for the 
    // book object passed as argument and returns the newly
    // create book-card div
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');

    const titleDisplay = document.createElement('p');
    titleDisplay.classList.add('book-title');
    titleDisplay.textContent = book.title;
    bookDiv.appendChild(titleDisplay);

    const authorDisplay = document.createElement('p');
    authorDisplay.classList.add('book-author');
    authorDisplay.textContent = book.author;
    bookDiv.appendChild(authorDisplay);

    const pagesDisplay = document.createElement('p');
    pagesDisplay.classList.add('book-pages');
    pagesDisplay.textContent = book.numOfPages + ' pages';
    bookDiv.appendChild(pagesDisplay);

    const readStatusDisplay = document.createElement('div') as HTMLDivElement;
        const readDisplay = document.createElement('span') as HTMLSpanElement;
        readDisplay.textContent = "READ";
        readStatusDisplay.appendChild(readDisplay);
        const readStatusDisplayCheckbox = document.createElement('input') as HTMLInputElement;
        readStatusDisplayCheckbox.type = "checkbox";
        readStatusDisplayCheckbox.classList.add('book-read-status');
        readStatusDisplayCheckbox.checked = book.isRead;
        readStatusDisplay.appendChild(readStatusDisplayCheckbox);
        const notReadDisplay = document.createElement('span') as HTMLSpanElement;
        notReadDisplay.textContent = "NOT READ";
        readStatusDisplay.appendChild(notReadDisplay);
    bookDiv.appendChild(readStatusDisplay);

    const removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('delete-book');
    removeBookBtn.value = index;
    removeBookBtn.addEventListener("click", (ev) => {
        removeBookFromLibrary(parseInt((ev.target as HTMLButtonElement).value));
        render();
    });
    removeBookBtn.textContent = "Remove";
    bookDiv.appendChild(removeBookBtn);

    bookDiv.setAttribute('data-index', index);
    return bookDiv;
}
const render = () => {
    resetDisplayDiv();
    library.forEach((book, index) => {
        const bookCard = createBookCard(book, index.toString());
        displayBooksDiv.appendChild(bookCard);
    })
}
// Create a function to edit the bookReadStatus
const changeBookReadStatus = (bookIndex: number, status: boolean) => {
    library[bookIndex].toggleReadStatus(status);
}

// Create a function that clears all the input elemnts to it's default
// value
const clearForm = () => {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatusInput.checked = false;
}

// Create dummy book data and add to library
const book1 = new (Book as any)('sample book', 'unknown', 2, false);
const book2 = new (Book as any)('sample book', 'unknown', 50, true);
addBookToLibrary(book1);
addBookToLibrary(book2);

addBookBtn.addEventListener("click", (ev) => {
    addBookModal.classList.remove('hidden');
})

cancelBtn.addEventListener("click", (ev) => {
    addBookModal.classList.add('hidden');
})

submitBtn.addEventListener("click", (ev: Event) => {
    ev.preventDefault();
    const newBook =
        new (Book as any)(titleInput.value, authorInput.value, pagesInput.value, readStatusInput.checked);
    library.push(newBook);
    clearForm();
    render();
});

render();

(document.querySelector('input.book-read-status') as HTMLInputElement)
    .addEventListener("change", (ev) => {
        const target = ev.target as HTMLInputElement;
        changeBookReadStatus(Number(target.dataset.index), target.checked);
    });
