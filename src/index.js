import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

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
    contentPage: document.querySelector('#content'),
    loginBtn: document.querySelector('#login-button'),
    logoutBtn: document.querySelector('#logout-button'),
    currentUserName: document.querySelector('#current-username'),
    profilePic: document.querySelector('#dp'),
    displayUser: document.querySelector('#user')
}

const errorMessages = {
    blankTitle: 'Please provide a valid book name',
    blankAuthor: 'Please provide a valid author name',
}

class Book {
    constructor (title, author, pages, status, id) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status,
    this.id = id
    };
};

class User {
    constructor(userName, userEmail, userDP, userUID) {
        this.name = userName,
        this.email = userEmail,
        this.image = userDP,
        this.userId = userUID
    }
}

async function userLogin() {
    try {
        const user = await signInWithPopup(auth, provider);
        currentUser = new User(auth.currentUser.displayName, auth.currentUser.email, auth.currentUser.photoURL, auth.currentUser.uid);
        renderPage();
        renderUser(true);
    } catch(error) {
        console.log(error)
    }
}

async function userLogout() {
    try {
        const logout = await signOut(auth);
        console.log('user has logged out');
        renderUser(false);
        renderPage();
    } catch(error) {
        console.log(error);
    }
}

async function addBookToDatabase (book) {
    try {
        const bookAdded = await addDoc(collection(db, currentUser.name), book);
        console.log('book added', bookAdded.id);
    } catch(error) {
        console.log(error)
    }
}

async function getBooksFromDatabase () {
    const booksFromDB = await getDocs(collection(db, currentUser.name));
    return booksFromDB.docs.map(item => {
        const book = item._document.data.value.mapValue.fields;
        const { inputTitle, inputAuthor, inputPages, inputRead } = book;
        return new Book(inputTitle.stringValue, inputAuthor.stringValue, inputPages.stringValue, inputRead.booleanValue, item.id);
    });
}

async function deleteBookFromDatabase (id) {
    await deleteDoc(doc(db, currentUser.name, id));
    console.log('book deleted: ', id)
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

domElements.loginBtn.addEventListener('click', userLogin)

domElements.logoutBtn.addEventListener('click', userLogout);

function renderUser(status) {
    if (status) {
        domElements.currentUserName.textContent = currentUser.name;
        domElements.profilePic.setAttribute('src', currentUser.image);
    } else {
        domElements.currentUserName.textContent = '';
        domElements.profilePic.removeAttribute('src');
        domElements.displayUser.classList.add('hidden');
        domElements.loginBtn.classList.remove('hidden');
    }
}

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

    const storeinDB = {
        inputTitle,
        inputAuthor,
        inputPages,
        inputRead
    }

    addBookToDatabase(storeinDB);
    clearAll();
    renderPage();
};

function clearAll() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

function createCards(book) {
    console.log(book);
    const deleteBook = document.createElement('button');
    const statusToggle = document.createElement('input');

    const divBook = document.createElement('div');
    divBook.classList.add('book-card');

    divBook.appendChild(deleteBook);
    deleteBook.classList.add('delete');
    deleteBook.dataset.id = book.id;

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


    const deleteButton = divBook.querySelector('.delete');

    deleteButton.addEventListener('click', function() {
        let currentBook = this.dataset.id;
        deleteBookFromDatabase(currentBook);
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
    
    domElements.cardArea.appendChild(divBook);

    return {
        deleteButton,
        toggleButton
    }

};

async function renderPage() {
    if (auth.currentUser === null) {
        domElements.contentPage.classList.add('hidden');
        return;
    } 

    domElements.loginBtn.classList.add('hidden');
    // domElements.logoutBtn.classList.remove('hidden');
    domElements.displayUser.classList.remove('hidden');
    domElements.contentPage.classList.remove('hidden');

    const library = await getBooksFromDatabase();

    if (domElements.cardArea.hasChildNodes()) {

        domElements.cardArea.childNodes.forEach(child => {
            child.remove();
        });
    }

    library.forEach(book => createCards(book));
}

renderPage();


