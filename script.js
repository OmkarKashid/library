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
}
function addReadToggleEventHandler(){
    const readToggles = document.querySelectorAll(".toggle");
    readToggles.forEach(readToggle => readToggle.addEventListener("change", function(){ changeReadStatus(readToggle.getAttribute("data-book_index"));}));
}
function changeReadStatus(book_index){
    userLibrary[book_index].isread = !(userLibrary[book_index].isread);
    showAllBooks();
}
function addDeleteEventHandler(){
    const delBtns = document.querySelectorAll("button[data-index]");
    delBtns.forEach(delBtn => delBtn.addEventListener("click", function(){ deleteBookFromLibrary(delBtn.getAttribute("data-index"));}));
}

function deleteBookFromLibrary(book_index){
    userLibrary.splice(book_index,1);
    showAllBooks();
}

function showAllBooks(){
    document.querySelectorAll(".book").forEach(e => e.remove());
    userLibrary.forEach((book, i) => {
        let checkbox = `<input class="toggle" data-book_index="${i}" type="checkbox">`;
        if(book.isread){
          checkbox = `<input class="toggle" data-book_index="${i}" type="checkbox" checked>`;
        }
        const readStatus = book.isread? "finished reading" : "not read yet";
        const div = document.createElement("div");
        div.className = "book";
        div.setAttribute("id", `${book.title}`);
        div.innerHTML = `<h3>${book.title}</h3>
                         <div>Author: ${book.author}</div>
                         <div>Total Pages: ${book.pages}</div>
                         <div>Status: ${readStatus}</div>
                         <span>Read :</span>
                         <label class="switch">                   
                           ${checkbox}
                           <span class="slider round"></span>
                         </label>
                         <br>
                         <br>
                         <button data-index="${i}">Delete</button>`;
        booksContainer.appendChild(div);
    });
    addDeleteEventHandler();
    addReadToggleEventHandler();
}
function showNewBookForm(){
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

/*Getting new book data from user filled form */
function getData(form) {
    let formData = new FormData(form);
    let book_title = Object.fromEntries(formData).book_title;
    let book_author = Object.fromEntries(formData).book_author;
    let book_pages = Object.fromEntries(formData).book_pages;
    let book_readStatus = Object.fromEntries(formData).book_readStatus ? true : false;
    
    addBookToLibrary(new Book(book_title, book_author, book_pages, book_readStatus));
}

document.querySelector("#new_book_form").addEventListener("submit", function (e) {
    e.preventDefault(); //prevents default function of submitting data to server
    getData(e.target);
    document.querySelector("#new_book_form").reset();
});

const booksContainer = document.querySelector("#container");
//Demo Book
let book1 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowlings", 223, false);
addBookToLibrary(book1);
showAllBooks();

const addBtn = document.querySelector("#add_btn");
addBtn.addEventListener("click", showNewBookForm);

const submitBtn = document.querySelector("#submit_btn");
submitBtn.addEventListener("click", hideNewBookForm);

const cancelBtn = document.querySelector("#cancel_btn");
cancelBtn.addEventListener("click", hideNewBookForm);