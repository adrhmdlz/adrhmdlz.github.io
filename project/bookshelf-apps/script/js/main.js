document.addEventListener('DOMContentLoaded', function() {
    const books = [];
    const SAVED_EVENT = 'saved-book';
    const STORAGE_KEY = 'BOOKSHELF_APPS';
    const RENDER_EVENT = 'render-book';
    const inputBook = document.getElementById('inputBook');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');

    inputBook.addEventListener('submit', function(event) { 
        event.preventDefault();
        addBook();
    });

    function addBook() {
        const bookTitle = document.getElementById('inputBookTitle').value;
        const bookAuthor = document.getElementById('inputBookAuthor').value;
        const bookYear = document.getElementById('inputBookYear').value;
        const bookStatus = document.getElementById('inputBookIsComplete').checked;

        const generateID = generateId();
        const bookObject = generateBookObject(generateID, bookTitle, bookAuthor, bookYear, bookStatus);
        books.push(bookObject);

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }

    function generateId() {
        return +new Date();
    }

    function generateBookObject(id, title, author, year, isCompleted) {
        return {
            id,
            title,
            author,
            year,
            isCompleted
        }
    }

    function displayBook(bookObject) {
        const bookTextTitle = document.createElement('h4');
        const bookTextAuthor = document.createElement('p');
        const bookTextYear = document.createElement('p');
        const bookDesc = document.createElement('div');
        const bookSubmit = document.createElement('div');
        const bookContainer = document.createElement('article');

        bookTextTitle.innerText = bookObject.title;
        bookTextAuthor.innerText = bookObject.author;
        bookTextYear.innerText = bookObject.year;

        bookDesc.classList.add('book-desc');
        bookDesc.append(bookTextTitle, bookTextAuthor, bookTextYear);

        bookContainer.classList.add('book-item');
        bookContainer.append(bookDesc);
        bookContainer.setAttribute('id', `book-${bookObject.id}`);
        
        if (bookObject.isCompleted) {
            const buttonC = document.createElement('button');
            const buttonB = document.createElement('button');
            
            buttonC.classList.add('yellow');
            buttonC.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
            buttonB.classList.add('red');
            buttonB.innerHTML = '<i class="fa-solid fa-trash"></i>';
            
            bookSubmit.classList.add('action');
            bookSubmit.append(buttonC, buttonB);

            buttonC.addEventListener('click', function() {
                undoBookFromCompleted(bookObject.id);
            });

            buttonB.addEventListener('click', function() {
                removeBook(bookObject.id);
            });

            bookContainer.append(bookSubmit)
        } else {
            const buttonA = document.createElement('button');
            const buttonB = document.createElement('button');
            
            buttonA.classList.add('green');
            buttonA.innerHTML = '<i class="fa-solid fa-check"></i>';
            buttonB.classList.add('red');
            buttonB.innerHTML = '<i class="fa-solid fa-trash"></i>';

            bookSubmit.classList.add('action');
            bookSubmit.append(buttonA, buttonB)

            buttonA.addEventListener('click', function() {
                addBookToCompleted(bookObject.id);
            });

            buttonB.addEventListener('click', function() {
                removeBook(bookObject.id);
            });

            bookContainer.append(bookSubmit)
        }

        return bookContainer;
    }

    function addBookToCompleted(bookId) {
        const bookTarget = findBook(bookId);

        if (bookTarget == null) return;

        bookTarget.isCompleted = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }

    function removeBook(bookId) {
        deletingBookId = bookId;
        confirmationModal.style.display = 'block';
    }

    function removeBookFromList(bookId) {
        const bookTarget = findBookIndex(bookId);

        if (bookTarget === -1) return;

        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
      
    function hideDeleteConfirmation() {
        confirmationModal.style.display = 'none';
    }

    function undoBookFromCompleted(bookId) {
        const bookTarget = findBook(bookId);

        if (bookTarget == null) return;

        bookTarget.isCompleted = false;
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }

    function findBook(bookId) {
        for (const bookItem of books) {
            if (bookItem.id === bookId) {
                return bookItem;
            }
        }

        return null
    }

    function findBookIndex(bookId) {
        for (const index in books) {
            if (books[index].id === bookId) {
                return index;
            }
        }

        return -1;
    }

    function saveData() {
        if (isStorageExist()) {
            const parsed = JSON.stringify(books);
            localStorage.setItem(STORAGE_KEY, parsed);
            document.dispatchEvent(new Event(SAVED_EVENT));
        }
    }

    function isStorageExist() {
        if (typeof (Storage) === undefined) {
            alert('Browser kamu tidak mendukung local storage!');
            return false;
        }
        return true;
    }

    function loadDataFromStorage() {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(serializedData);

        if (data !== null) {
            for (const book of data) {
                books.push(book);
            }
        }

        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    confirmDeleteButton.addEventListener('click', function() {
        removeBookFromList(deletingBookId);
        hideDeleteConfirmation();
    });
      
    cancelDeleteButton.addEventListener('click', function() {
        hideDeleteConfirmation();
    });

    document.addEventListener(RENDER_EVENT, function() {
        const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
        incompleteBookshelfList.innerHTML = '';

        const completedBookshelfList = document.getElementById('completeBookshelfList');
        completedBookshelfList.innerHTML = '';

        for (const bookItem of books) {
            const bookElement = displayBook(bookItem);
            if(!bookItem.isCompleted) {
                incompleteBookshelfList.append(bookElement);
            } else {
                completedBookshelfList.append(bookElement);
            }
        }
    });

    document.addEventListener(SAVED_EVENT, function() {
        console.log(localStorage.getItem(STORAGE_KEY));
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});