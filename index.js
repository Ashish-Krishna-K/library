var _a;
var addBookBtn = document.querySelector('button.add-book');
var titleInput = document.querySelector('input#title');
var authorInput = document.querySelector('input#author');
var pagesInput = document.querySelector('input#pages');
var readStatusInput = document.querySelector('input#read-status');
var submitBtn = document.querySelector('button.submit');
var cancelBtn = document.querySelector('button.cancel');
var addBookModal = document.querySelector('div.modal');
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
Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
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
    titleDisplay.textContent = "\"".concat(book.title, "\"");
    bookDiv.appendChild(titleDisplay);
    var authorDisplay = document.createElement('p');
    authorDisplay.classList.add('book-author');
    authorDisplay.textContent = book.author;
    bookDiv.appendChild(authorDisplay);
    var pagesDisplay = document.createElement('p');
    pagesDisplay.classList.add('book-pages');
    pagesDisplay.textContent = book.numOfPages + ' pages';
    bookDiv.appendChild(pagesDisplay);
    var readStatusDisplay = document.createElement('button');
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
    readStatusDisplay.addEventListener("click", function (ev) {
        var target = ev.target;
        changeBookReadStatus(Number(target.value));
        render();
    });
    bookDiv.appendChild(readStatusDisplay);
    var removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('delete-book');
    removeBookBtn.value = index;
    removeBookBtn.addEventListener("click", function (ev) {
        removeBookFromLibrary(parseInt(ev.target.value));
        render();
    });
    removeBookBtn.textContent = "Remove";
    bookDiv.appendChild(removeBookBtn);
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
var changeBookReadStatus = function (bookIndex) {
    library[bookIndex].toggleReadStatus();
};
// Create a function that clears all the input elemnts to it's default
// value
var clearForm = function () {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatusInput.checked = false;
};
var handleCancelBtnClick = function () {
    addBookModal.classList.add('hidden');
};
addBookBtn.addEventListener("click", function () {
    addBookModal.classList.remove('hidden');
});
cancelBtn.addEventListener("click", handleCancelBtnClick);
addBookModal.addEventListener("click", handleCancelBtnClick);
(_a = document.querySelector('form#add-book-form')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (ev) {
    ev.stopPropagation();
});
submitBtn.addEventListener("click", function (ev) {
    ev.preventDefault();
    if (titleInput.value === '' || authorInput.value === '' || pagesInput.value === '')
        return;
    var newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatusInput.checked);
    library.push(newBook);
    clearForm();
    render();
    handleCancelBtnClick();
});
render();
