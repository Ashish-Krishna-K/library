var addBookBtn = document.querySelector('button.add-book');
var titleInput = document.querySelector('input#title');
var authorInput = document.querySelector('input#author');
var pagesInput = document.querySelector('input#pages');
var readStatusInput = document.querySelector('input#read-status');
var submitBtn = document.querySelector('button.submit');
var cancelBtn = document.querySelector('button.cancel');
var displayBooksDiv = document.querySelector('div.display-books-wrapper');
// Create a library array
var library = [];
var Book = function (title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = pages;
    this.isRead = readStatus;
};
// Create a method on the book object to edit isRead field
Book.prototype.toggleReadStatus = function (status) {
    this.isRead = status;
};
// Create a addBookToLibrary function
var addBookToLibrary = function (book) {
    library.push(book);
};
// Create a removeBookFromLibrary function
var removeBookFromLibrary = function (bookIndex) {
    library.splice(bookIndex, 1);
};
// Create a render function to handle rhe re-render
var resetDisplayDiv = function () {
    // A helper function to remove all current childNodes
    // from displayBooksDiv
    displayBooksDiv.replaceChildren();
};
var createBookCard = function (book, index) {
    // A helper function that creates a div element for the 
    // book object passed as argument and returns the newly
    // create book-card div
    var bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    var titleDisplay = document.createElement('p');
    titleDisplay.classList.add('book-title');
    titleDisplay.textContent = book.title;
    bookDiv.appendChild(titleDisplay);
    var authorDisplay = document.createElement('p');
    authorDisplay.classList.add('book-author');
    authorDisplay.textContent = book.author;
    bookDiv.appendChild(authorDisplay);
    var pagesDisplay = document.createElement('p');
    pagesDisplay.classList.add('book-pages');
    pagesDisplay.textContent = book.numOfPages.toString();
    bookDiv.appendChild(pagesDisplay);
    var readStatusDisplay = document.createElement('input');
    readStatusDisplay.type = "checkbox";
    readStatusDisplay.classList.add('book-read-status');
    readStatusDisplay.checked = book.isRead;
    bookDiv.appendChild(readStatusDisplay);
    var removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('delete-book');
    removeBookBtn.value = index;
    removeBookBtn.addEventListener("click", function (ev) {
        removeBookFromLibrary(parseInt(ev.target.value));
        render();
    });
    bookDiv.setAttribute('data-index', index);
    return bookDiv;
};
var render = function () {
    resetDisplayDiv();
    library.forEach(function (book, index) {
        var bookCard = createBookCard(book, index.toString());
        displayBooksDiv.appendChild(bookCard);
    });
};
// Create a function to edit the bookReadStatus
var changeBookReadStatus = function (bookIndex, status) {
    library[bookIndex].toggleReadStatus(status);
};
// Create a function that clears all the input elemnts to it's default
// value
var clearForm = function () {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatusInput.checked = false;
};
// Create dummy book data and add to library
var book1 = new Book('sample book', 'unknown', 2, false);
var book2 = new Book('sample book', 'unknown', 50, true);
addBookToLibrary(book1);
addBookToLibrary(book2);
// addBookBtn.addEventListener("click", )
submitBtn.addEventListener("click", function (ev) {
    ev.preventDefault();
    var newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatusInput.checked);
    library.push(newBook);
    render();
    clearForm();
});
render();
