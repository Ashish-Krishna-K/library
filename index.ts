// Create a library array
const library = [];
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
// Create a removeBookFromLibrary function
// Create a render function to handle rhe re-render