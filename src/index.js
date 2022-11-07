"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaperBook_js_1 = require("../src/PaperBook.js");
let books;
let errors = [
    {
        id: 0,
        name: 'book-name',
        text: 'Adjon meg egy könyv nevet!'
    },
    {
        id: 1,
        name: 'book-price',
        text: 'Adjon meg egy valós árat!'
    },
    {
        id: 2,
        name: 'book-weight',
        text: 'Adjon meg egy valós súlyt!'
    },
    {
        id: 3,
        name: 'book-isbn',
        text: 'Adjon meg egy valós isbn-t!'
    },
];
let activeErrors;
let formError;
document.addEventListener('DOMContentLoaded', () => {
    let name;
    let price;
    let weight;
    let isbn;
    formError = document.getElementById('form-error');
    setError(-1);
    //#region name check
    document.getElementById('book-name').addEventListener('change', e => {
        let bookName = e.currentTarget.value;
        if (checkBookName(bookName)) {
            setError(0);
        }
        else {
            removeError(0);
            name = bookName;
        }
    });
    //#endregion
    //#region Price Check
    document.getElementById('book-price').addEventListener('change', e => {
        let bookPrice = e.currentTarget.value;
        if (checkPrice(bookPrice)) {
            setError(1);
        }
        else {
            removeError(1);
            price = parseInt(bookPrice);
        }
    });
    //#endregion
    //#region Weight check
    document.getElementById('book-weight').addEventListener('change', e => {
        let bookWeight = e.currentTarget.value;
        if (checkWeight(bookWeight)) {
            setError(2);
        }
        else {
            removeError(2);
            weight = parseInt(bookWeight);
        }
    });
    //#endregion
    //#region Isbn checl
    document.getElementById('book-isbn').addEventListener('change', e => {
        let bookIsbn = e.currentTarget.value;
        if (checkIsbn(bookIsbn)) {
            setError(3);
        }
        else {
            removeError(3);
            isbn = bookIsbn;
        }
    });
    //#endregion
    document.getElementById('add-book').addEventListener('click', () => {
        name = document.getElementById('book-name').value;
        price = parseInt(document.getElementById('book-price').value);
        weight = parseInt(document.getElementById('book-weight').value);
        isbn = document.getElementById('book-isbn').value;
        if (!checkBookName(name) && !checkPrice(price.toString()) && !checkWeight(weight.toString()) && !checkIsbn(isbn)) {
            books.push(new PaperBook_js_1.PaperBook(name, price, isbn, weight));
        }
    });
});
const checkBookName = (bookName) => {
    return bookName.length <= 0;
};
const checkPrice = (bookPrice) => {
    return parseInt(bookPrice) < 0;
};
const checkWeight = (bookWeight) => {
    return parseInt(bookWeight) <= 0;
};
const checkIsbn = (bookIsbn) => {
    return bookIsbn != "" && bookIsbn.length != 13;
};
const setError = (errorId) => {
    if (errorId == -1) {
        activeErrors = [];
        formError.style.display = 'none';
    }
    else {
        if (activeErrors.filter(e => e.id == errorId).length == 0) {
            activeErrors.push(errors.filter(e => e.id == errorId)[0]);
            activeErrors = activeErrors.sort((a, b) => a.id - b.id);
            console.log(activeErrors);
            formError.textContent = activeErrors[0].text;
            formError.style.display = 'block';
        }
    }
};
const setNextError = () => {
    if (activeErrors.length > 0) {
        formError.textContent = activeErrors[0].text;
        formError.style.display = 'block';
    }
    else {
        formError.style.display = 'none';
    }
};
const removeError = (errorId) => {
    if (activeErrors.filter(e => e.id == errorId).length != 0) {
        console.log(activeErrors.indexOf(activeErrors.filter(e => e.id == errorId)[0]));
        console.log(activeErrors);
        activeErrors.splice(activeErrors.indexOf(activeErrors.filter(e => e.id == errorId)[0]), 1);
        console.log(activeErrors);
        setNextError();
    }
};
