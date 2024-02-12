const tableBody = document.querySelector("tbody")
const form = document.querySelector("#submit-form")
const titleForm = document.querySelector("#title")
const authorForm = document.querySelector("#author")
const pagesForm = document.querySelector("#pages")
const statusForm = document.querySelector("#status-check")
const submitButton = document.querySelector("#submit-btn")
const newFormButton = document.querySelector("#new-form-btn")

const myLibrary = [];

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    changeStatus() {
        if (this.readStatus === true) {
            this.readStatus = false
        } else {
            this.readStatus = true
        }
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function render() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild)
    }
    let i = 0;
    myLibrary.forEach((book) => {
        let newRow = document.createElement("tr")
        for (let key in book) {
            let newCell = document.createElement("td")
            if (book[key] === true) {
                newCell.textContent = "Read"
            } else if (book[key] === false) {
                newCell.textContent = "Not Read"
            } else {
                newCell.textContent = book[key]
            }
            newRow.appendChild(newCell)
        }
        let emptyCell = document.createElement("td")
        let deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-btn")
        deleteButton.setAttribute("array-data", i)
        emptyCell.appendChild(deleteButton)
        let statusButton = document.createElement("button")
        statusButton.classList.add("status-btn")
        statusButton.setAttribute("array-data", i)
        emptyCell.appendChild(statusButton)
        newRow.appendChild(emptyCell)
        tableBody.appendChild(newRow)
        i++;
    })
    let allDeleteButtons = document.querySelectorAll(".delete-btn")
    allDeleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let arrayOrder = +button.getAttribute("array-data")
            myLibrary.splice(arrayOrder, 1)
            render()
        })
    })
    let allEditButtons = document.querySelectorAll(".status-btn")
    allEditButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let arrayOrder = +button.getAttribute("array-data")
            let book = myLibrary[arrayOrder]
            book.changeStatus()
            render()
        })
    })
}

function bookSubmit() {
    let title = titleForm.value
    let author = authorForm.value
    let pages = pagesForm.value
    let readStatus;
    if (statusForm.checked) {
        readStatus = true;
    } else {
        readStatus = false;
    }
    let newBook = new Book(title, author, pages, readStatus)
    addBookToLibrary(newBook)
    render()
}

submitButton.addEventListener("click", bookSubmit)

newFormButton.addEventListener("click", () => {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden")
        form.classList.add("shown")
    } else {
        form.classList.remove("shown")
        form.classList.add("hidden")
    }
})

theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 346, true)
addBookToLibrary(theHobbit)
render()