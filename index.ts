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
