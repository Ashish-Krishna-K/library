import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVqBZrtDBueWH-Wp9LckQu8JuRJpctkv0",
  authDomain: "odin-library-6ac7d.firebaseapp.com",
  projectId: "odin-library-6ac7d",
  storageBucket: "odin-library-6ac7d.appspot.com",
  messagingSenderId: "582111750986",
  appId: "1:582111750986:web:30fbb157fe83485af3efb3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

function addBookToDatabase (book) {
    try {
        const bookAdded = addDoc(collection(db, "books"), {
            title: book.inputTitle,
            author: book.inputAuthor,
            pages: book.inputPages,
            readStatus: book.inputRead
        });
        console.log('book added');
    } catch(error) {
        console.log(error)
    }
}

async function getBooksFromDatabase () {
    const booksFromDB = await getDocs(collection(db, "books"));
    booksFromDB.forEach(item => {
        const book = item._document.data.value.mapValue.fields;
        const { title, author, pages, readStatus } = book;
        myLibrary.push(new Book(title.stringValue, author.stringValue, pages.stringValue, readStatus.booleanValue));
    });
}
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

async function createBooks() {

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

    const storeinDB = {
        inputTitle,
        inputAuthor,
        inputPages,
        inputRead
    }

    addBookToDatabase(storeinDB);
    clearAll();
};

function clearAll() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

function createCards(book) {

    const deleteBook = document.createElement('button');
    const statusToggle = document.createElement('input');

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
    statusToggle.checked = book.status.checked;
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

async function renderPage() {
    await getBooksFromDatabase();
    myLibrary.forEach(book => createCards(book));
}

renderPage();


