
let books = JSON.parse(localStorage.getItem("books")) || [];

// Display Books

function displayBooks() {

    const table = document.getElementById("bookTable");

    table.innerHTML = "";

    books.forEach((book, index) => {

        let row = `
        <tr>
            <td>${escapeHTML(book.bookId)}</td>
            <td>${escapeHTML(book.bookName)}</td>
            <td>${escapeHTML(book.author)}</td>
            <td>${escapeHTML(book.publisher)}</td>
            <td>${escapeHTML(book.category)}</td>
            <td>${escapeHTML(book.isbn)}</td>
            <td>${escapeHTML(book.quantity)}</td>
            <td>${escapeHTML(book.price)}</td>
            <td>
                <button class="delete-btn"
                onclick="deleteBook(${index})">
                Delete
                </button>
            </td>
        </tr>`;

        table.innerHTML += row;

    });
}

// Prevent HTML injection in book details

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Add Book

document.getElementById("bookForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const bookId = document.getElementById("bookId").value.trim();

    // Check duplicate Book ID

    if (books.some(book => book.bookId === bookId)) {

        alert("Book ID already exists!");

        return;
    }

    const book = {

        bookId: bookId,

        bookName: document.getElementById("bookName").value.trim(),

        author: document.getElementById("author").value.trim(),

        publisher: document.getElementById("publisher").value.trim(),

        category: document.getElementById("category").value,

        isbn: document.getElementById("isbn").value.trim(),

        quantity: document.getElementById("quantity").value,

        price: document.getElementById("price").value

    };

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));

    displayBooks();

    this.reset();

    alert("Book Added Successfully!");

});

// Delete Book

function deleteBook(index) {

    if (confirm("Are you sure you want to delete this book?")) {

        books.splice(index, 1);

        localStorage.setItem("books", JSON.stringify(books));

        displayBooks();

        alert("Book Deleted Successfully!");

    }

}

// Initial Display

displayBooks();
