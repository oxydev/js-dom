// Book Constuctor 
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
    const list =  document.getElementById('book-list');
    //create tr elcment
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a herf="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}


//Event Listener
document.querySelector('#book-form').addEventListener('submit', function (e) {

    //Get Form Value
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    // Instantiate Book
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui =  new UI;

    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui

    e.preventDefault();   
})