let userLibrary = [];

function Book(title, author, pages, isread){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
    this.isRendered = false;
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
        if(book.isRendered === false){
            const readStatus = book.isread? "finished reading" : "not read yet";
            const div = document.createElement("div");
            div.className = "book";
            div.innerHTML = `<h3>${book.title}</h3>
                            <div>Author: ${book.author}</div>
                            <div>Total Pages: ${book.pages}</div>
                            <div>Status: ${readStatus}</div>`;
            booksContainer.appendChild(div);
            book.isRendered = true;
        }
    });
}
function showNewBookForm(){
    console.log("btn click");
    
}
const booksContainer = document.querySelector("#container");
let book1 = new Book("Harry Potter", "J.K. Rowlings", 30, false);
let book2 = new Book("Harry Potter 2", "J.K. Rowlings 2", 30, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
showAllBooks();
const addBtn = document.querySelector("#add_btn");
addBtn.addEventListener("click", showNewBookForm);