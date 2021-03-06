class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
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

    showAlert(message, className) {
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

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }

    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;
            
            //Add book to ui
            ui.addBookToList(book);
        })
    }

    static addBook(book){  
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
       const books = Store.getBooks();

       books.forEach(function (book, index) {
           if(book.isbn === isbn){
               books.splice(index, 1);
           }
       });
       localStorage.setItem('books', JSON.stringify(books));
    }

}


//DOM load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listener for add book
document.querySelector('#book-form').addEventListener('submit', function (e) {

    //Get Form Value
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui = new UI;

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Show error
        ui.showAlert('Please fill all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to LS
        Store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }


    e.preventDefault();
})

//Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI
    const ui = new UI;

    ui.deleteBook(e.target);

    //remove from local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //Show message
    if(e.target === 'delete'){
        ui.showAlert('Book Removed', 'success');
    }
    e.preventDefault();
})