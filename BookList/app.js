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

//Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show alert
UI.prototype.showAlert = function (message, className) {
    // Create DIV
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    // Insert Alert
    container.insertBefore(div, form); //takes two parameter (what we wanna insert, what we wanna insert before)

    // TimeOut after 3sec
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
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

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Show error
        ui.showAlert('Please fill all fields','error');
    }else{
        // Add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book Added!', 'success');
    
        // Clear fields
        ui.clearFields();
    }


    e.preventDefault();   
})