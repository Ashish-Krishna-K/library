# library

[Live Demo](https://ashish-krishna-k.github.io/library/)

Library is a basic webpage that let's the user keep track of books they have read/wish to read. It is built as part of [The Odin Project's](https://www.theodinproject.com/) Javascript course.

*The project was initially built during my first run of the odin project where it had support for saving user data utilizing firebase as backend, during my second run of the odin project I am revisiting the older projects esentially reworking the whole project from scratch, during my second run I have decided to use TypeScript as a practice.*

The HTML and CSS sections are fairly staright forward, coming to the index.ts file, we start off by declaring variables for all the DOM elements we will be manipulating from JS.

Next we declare a library class which holds the library array which in turn stores all the book objects and also holds methods used for working with the library array.

We also declare a Book interface which helps in type casting the book object instances.
Following that we declare the Book class.

The addBookToLibrary function will add the newly created book instance in the library array.

The removeBookFromLibrary takes the index corresponding to a book as it's only parameter and then removes that book from the library array.

The resetDisplayDiv is a helper function which will remove all child nodes of the displayBooksWrapper

The createBookCard is another helper function, it creates a new div element for the passed in book with appropriate diplay values and returns the newly created div.

The render function will first call resetDisplayDiv to reset the wrapper and then append a new book-card-div for each book in the library array to the wrapper

The changeBookReadStatus essentially toggles the isRead boolean in the book object.

The clearForm will rest all the input values.

The handleCancelBtnClick will hide the addBookModal

Next we have an event listener on the add new book button to show the addBookModal

Next we stop propagation on the form element to prevent the modal from closing when the form is clicked

The submit button event handler will first prevent the default behaviour of the submit button, next if any of the input fields are blank it will not do anything and return, if they're not blank it creates a new book instance, pushes it to the library clears the form and re-renders the displayBooks wrapper, while also calling the handleCancelBtnClick function to hide the addBookModal.

Finally we call the render function to render the page.

**Additional note: The styling of the scrollbar was acheived thanks to [this stackoverflow answer](https://stackoverflow.com/a/62503864) by mynamejeff**