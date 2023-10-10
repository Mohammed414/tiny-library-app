const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    numberOfPages: 295,
    isRead: false,
  },
  {
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    numberOfPages: 423,
    isRead: true,
  },
];

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
  this.info = function () {
    return `${title} by ${author}, ${numberOfPages} pages, ${
      isRead ? "read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(book) {
  // store book in myLibrary
  myLibrary.push(book);
}

function getTableRow(no, title, author, numberOfPages, isRead) {
  return `<tr>
  <td class="book-no">${no}</td>
  <td class="book-title">${title}</td>
  <td class="book-author">${author}</td>
  <td class="book-nop">${numberOfPages}</td>
  <td class="book-status ${isRead ? "read" : "not-read"}">${
    isRead ? "Read" : "Not Read"
  }</td>
  <td class="delete-cell">
    <button class="delete">Delete</button>
  </td>
  </tr>`;
}

// get table body element
const tableBody = document.querySelector("tbody");

// add books to table
myLibrary.forEach((book, index) => {
  tableBody.innerHTML += getTableRow(
    index + 1,
    book.title,
    book.author,
    book.numberOfPages,
    book.isRead
  );
});
