const addBookBtn = document.querySelector('button.add-book') as HTMLButtonElement;
const titleInput = document.querySelector('input#title') as HTMLInputElement;
const authorInput = document.querySelector('input#author') as HTMLInputElement;
const pagesInput = document.querySelector('input#pages') as HTMLInputElement;
const readStatusInput = document.querySelector('input#read-status') as HTMLInputElement;
const submitBtn = document.querySelector('button.submit') as HTMLButtonElement;
const cancelBtn = document.querySelector('button.cancel') as HTMLButtonElement;
const displayBooksDiv = document.querySelector('div.display-books-wrapper') as HTMLDivElement;

// Create a library array
let library:Book[] = [];
// Create a book constructor
interface Book {
    title: string;
    author: string;
    numOfPages: number;
    isRead:boolean
}
const Book = function(this: Book, title:string, author:string, pages:number, readStatus:boolean) {
    this.title = title;
    this.author = author;
    this.numOfPages = pages;
    this.isRead = readStatus;
}
// Create a addBookToLibrary function
const addBookToLibrary = (book:Book) => {
    library.push(book);
}
// Create a removeBookFromLibrary function
const removeBookFromLibrary = (book:Book) => {
    library = library.filter(item => JSON.stringify(item) !== JSON.stringify(book));
}
// Create a render function to handle rhe re-render
const resetDisplayDiv = () => {
    // A helper function to remove all current childNodes
    // from displayBooksDiv
    displayBooksDiv.replaceChildren();
}
const createBookCard = (book:Book) => {
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
    pagesDisplay.textContent = book.numOfPages.toString();
    bookDiv.appendChild(pagesDisplay);
    const readStatusDisplay = document.createElement('input[type="checkbox"]') as HTMLInputElement;
    readStatusDisplay.classList.add('book-read-status');
    readStatusDisplay.checked = book.isRead;
    bookDiv.appendChild(readStatusDisplay);
    return bookDiv;
} 
const render = () => {
    resetDisplayDiv();
    library.forEach(book => {
        displayBooksDiv.appendChild(createBookCard(book));
    })
}