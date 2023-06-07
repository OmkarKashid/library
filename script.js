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