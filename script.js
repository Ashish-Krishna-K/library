const domElements = {
    form: document.getElementById('input-form'),
    title: document.querySelector('#title'),
    author: document.querySelector('#author'),
    pages: document.querySelector('#pages'),
    read: document.querySelector('#read'),
    cardArea: document.querySelector('#cards'),
    submit: document.getElementById('submit'),
    clear: document.getElementById('clear'),
    titleError: document.querySelector('#error-title'),
    authorError: document.querySelector('#error-author'),

}

const errorMessages = {
    blankTitle: 'Please provide a valid book name',
    blankAuthor: 'Please provide a valid author name',
}


let myLibrary = [];

class Book {
    constructor (title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
    };
};

domElements.title.addEventListener('blur', function(){
    if (title.validity.valid) {
    domElements.titleError.textContent = '';
    return;
    }
    domElements.titleError.textContent = errorMessages.blankTitle;
});

domElements.author.addEventListener('blur', function(){
    if (author.validity.valid) {
    domElements.authorError.textContent = '';
    return;
    }
    domElements.authorError.textContent = errorMessages.blankAuthor;
});

clear.addEventListener('click', clearAll)

submit.addEventListener('click', createBooks);

function createBooks() {

    if (!title.validity.valid) {
        domElements.titleError.textContent = errorMessages.blankTitle;
        return;
    }
    if (!author.validity.valid) {
        domElements.authorError.textContent = errorMessages.blankAuthor;
        return;
    }
    let inputTitle = title.value;
    let inputAuthor = author.value;
    let inputPages = pages.value;
    let inputRead = read.checked;

    myLibrary.push(new Book(inputTitle, inputAuthor, inputPages, inputRead));

    createCards();
    clearAll();
};

function clearAll() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

function createCards() {
    const lastIndex = myLibrary.length - 1;

    const deleteBook = document.createElement('button');
    const statusToggle = document.createElement('input');

    let book = myLibrary[lastIndex];

    const divBook = document.createElement('div');
    divBook.classList.add('book-card');

    divBook.appendChild(deleteBook);
    deleteBook.classList.add('delete');
    deleteBook.dataset.book = book.title;

    const bookTitle = document.createElement('div');
    bookTitle.classList.add('title');
    bookTitle.innerText = book.title;
    divBook.appendChild(bookTitle);
        
    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('author');
    bookAuthor.innerText = book.author;
    divBook.appendChild(bookAuthor);

    const bookPages = document.createElement('div');
    bookPages.classList.add('pages');
    if (book.pages) {
        bookPages.innerText = `${book.pages} pages`;
    }
    divBook.appendChild(bookPages);

    statusToggle.type = 'checkbox';
    statusToggle.checked = this.read.checked;
    statusToggle.classList.add('toggle');
    divBook.appendChild(statusToggle);

    book.status ? divBook.classList.add('read') : divBook.classList.add('not-read');

    domElements.cardArea.appendChild(divBook);

    const deleteButton = divBook.querySelector('.delete');

    deleteButton.addEventListener('click', function() {
        let currentBook = this.dataset.book;
        let delIndex = myLibrary.findIndex(object => {
            return object.title === currentBook;
        });
        myLibrary.splice(delIndex, 1);
        this.parentNode.remove();
    });

    const toggleButton = divBook.querySelector('.toggle');

    toggleButton.addEventListener('click', function(){

        if (this.checked) {
            this.parentNode.classList.remove('not-read');
            this.parentNode.classList.add('read')
        } else {
            this.parentNode.classList.remove('read');
            this.parentNode.classList.add('not-read')    
        }
    });

    return {
        deleteButton,
        toggleButton
    }

};



