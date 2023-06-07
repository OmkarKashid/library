let userLibrary = [];

function Book(title, author, pages, isread){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
}

Book.prototype.info = function(){
    const readStatus = isread? "finished reading" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}.`;
}

function addBookToLibrary(newBook){
    userLibrary.push(newBook);
}

function showAllBooks(){
    userLibrary.forEach(book => {
        const div = document.createElement("div");
        div.className = "book";
        div.innerHTML = `${book.title}, ${book.author}`;
        booksContainer.appendChild(div);
    });
}
const booksContainer = document.querySelector("#container");
let book1 = new Book("Harry Potter", "J.K. Rowlings", 30, false);
let book2 = new Book("Harry Potter 2", "J.K. Rowlings 2", 30, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
showAllBooks();