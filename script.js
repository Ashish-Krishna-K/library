const form = document.getElementById('input-form')
const title = form.querySelector('#title');
const author = form.querySelector('#author');
const pages = form.querySelector('#pages');
const read = form.querySelector('#read');
const cardArea = document.querySelector('#cards');
const submit = document.getElementById('submit');
const clear = document.getElementById('clear')

let inputTitle = null;
let inputAuthor = null;
let inputPages = null;
let inputRead = false;

let myLibrary = [];

function Book (title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
};

clear.addEventListener('click', clearAll)

submit.addEventListener('click', createBooks);

function createBooks() {

    inputTitle = title.value;
    inputAuthor = author.value;
    inputPages = pages.value;
    inputRead = read.checked;

    if(!inputTitle) {
        return;
    }

    myLibrary.push(new Book(inputTitle, inputAuthor, inputPages, inputRead));

    createCards();
    clearAll();
};


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
    bookPages.innerText = `${book.pages} pages`;
    divBook.appendChild(bookPages);

    statusToggle.type = 'checkbox';
    statusToggle.checked = this.read.checked;
    statusToggle.classList.add('toggle');
    divBook.appendChild(statusToggle);

    book.status ? divBook.classList.add('read') : divBook.classList.add('not-read');

    cardArea.appendChild(divBook);

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

};

function clearAll() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}
