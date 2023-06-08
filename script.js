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
    showAllBooks();
    /*document.querySelector(`[data-book_title="${newBook.title}"]`).addEventListener("click",deleteBookFromLibrary(newBook.title));*/
}
function deleteBookFromLibrary(book_title){
    console.log("delete");
    let index = userLibrary.findIndex(book => book.title === book_title);
    console.log("delete");
    console.log(index);
    userLibrary.splice(index,1);
    document.querySelector(`#${book_title}`).remove();
    console.log(userLibrary);
    showAllBooks();
}
function showAllBooks(){
    document.querySelectorAll(".book").forEach(e => e.remove());
    userLibrary.forEach(book => {
        
        const readStatus = book.isread? "finished reading" : "not read yet";
        const div = document.createElement("div");
        div.className = "book";
        div.setAttribute("id", `${book.title}`);
        div.innerHTML = `<h3>${book.title}</h3>
                         <div>Author: ${book.author}</div>
                         <div>Total Pages: ${book.pages}</div>
                         <div>Status: ${readStatus}</div>
                         <button data-book_title="${book.title}" >Delete</button>`;
        booksContainer.appendChild(div);
        book.isRendered = true;
        console.log("here");
    });
}
function showNewBookForm(){
    console.log("btn click");
    document.querySelector("#form_overlay").classList.remove("hide");
    document.querySelector("#new_book_form").classList.remove("hide");
}
function hideNewBookForm(){
    document.querySelector("#form_overlay").classList.add("hide");
    document.querySelector("#new_book_form").classList.add("hide");
}

/*For checking all input fields have value and Enable submit button*/
let inputs = document.querySelectorAll('input');

let inputValidator = {
  "book_title": false,
  "book_author": false,
  "book_pages": false
};

inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      let name = event.target.getAttribute('name');
      if (event.target.value.length > 0) {
        inputValidator[name] = true;
      } else {
        inputValidator[name] = false;
      };
  
      let allTrue = Object.keys(inputValidator).every((item) => {
        return inputValidator[item] === true;
      });
  
      if (allTrue) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    });
});

function getData(form) {
    let formData = new FormData(form);
    let book_title = Object.fromEntries(formData).book_title;
    let book_author = Object.fromEntries(formData).book_author;
    let book_pages = Object.fromEntries(formData).book_pages;
    let book_readStatus = Object.fromEntries(formData).book_readStatus ? true : false;
    
    addBookToLibrary(new Book(book_title, book_author, book_pages, book_readStatus));
}

document.querySelector("#new_book_form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
    document.querySelector("#new_book_form").reset();
});

const booksContainer = document.querySelector("#container");
let book1 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowlings", 223, false);
addBookToLibrary(book1);
showAllBooks();

const addBtn = document.querySelector("#add_btn");
addBtn.addEventListener("click", showNewBookForm);

const submitBtn = document.querySelector("#submit_btn");
submitBtn.addEventListener("click", hideNewBookForm);

const cancelBtn = document.querySelector("#cancel_btn");
cancelBtn.addEventListener("click", hideNewBookForm);