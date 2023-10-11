// get table body element
const tableBody = document.querySelector("tbody");

let myLibrary = [
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

// check if myLibrary is in local storage
if (localStorage.getItem("myLibrary") === null) {
  // save myLibrary to local storage
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
} else {
  // sync myLibrary with local storage
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

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
  // update local storage
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  updateLibrary();
}

function getTableRow(index, title, author, numberOfPages, isRead) {
  return `<tr data-index="${index}" >
  <td class="book-no">${index + 1}</td>
  <td class="book-title">${title}</td>
  <td class="book-author">${author}</td>
  <td class="book-nop">${numberOfPages}</td>
  <td class="book-status ${isRead ? "read" : "not-read"}">${
    isRead ? "Read" : "Not Read"
  }</td>
  <td class="delete-cell">
    <button class="btn btn-danger delete-cell-button">Delete</button>
  </td>
  </tr>`;
}
function updateLibrary() {
  // clear table
  tableBody.innerHTML = "";
  // add books to table
  JSON.parse(localStorage.getItem("myLibrary")).forEach((book, index) => {
    tableBody.innerHTML += getTableRow(
      index,
      book.title,
      book.author,
      book.numberOfPages,
      book.isRead
    );
  });
  // add event listener to delete buttons
  let deleteCellButtons = document.querySelectorAll(".delete-cell-button");
  deleteCellButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let index = event.target.parentElement.parentElement.dataset.index;
      deleteBook(index);
    });
  });

  // add event listener to status cells
  let statusCells = document.querySelectorAll(".book-status");
  statusCells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      cell.classList.toggle("read");
      cell.classList.toggle("not-read");
      cell.textContent = cell.textContent === "Read" ? "Not Read" : "Read";
      let index = event.target.parentElement.dataset.index;
      myLibrary[index].isRead = !myLibrary[index].isRead;
      // update local storage
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });
  });
}

function deleteBook(index) {
  // delete book from myLibrary
  myLibrary.splice(index, 1);
  // update local storage
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  updateLibrary();
}
// start
updateLibrary();

// Dialog
let openDialogButton = document.querySelector("#open-dialog");
let dialog = document.querySelector(".dialog");
let confirmButton = document.querySelector("#confirm-button");
let closeDialogButton = document.querySelector("#close-dialog");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const numberOfPagesInput = document.querySelector("#pages");

openDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  console.log(dialog.returnValue === "");
  if (dialog.returnValue === "") {
    return;
  }

  authorInput.value = "";
  titleInput.value = "";
  numberOfPagesInput.value = "";
  let newBook = JSON.parse(dialog.returnValue);
  addBookToLibrary(newBook);
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

confirmButton.addEventListener("click", (even) => {
  even.preventDefault();
  let title = titleInput.value;
  let author = authorInput.value;
  let numberOfPages = numberOfPagesInput.value;
  if (title === "" || author === "" || numberOfPages === "") {
    alert("Please fill all the fields");
    return;
  }
  let isRead =
    document.querySelector('input[name="status"]:checked').value === "read"
      ? true
      : false;

  // stringfy the book object and pass it to the close method
  dialog.close(JSON.stringify(new Book(title, author, numberOfPages, isRead)));
});
