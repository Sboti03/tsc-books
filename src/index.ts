import { Book } from '../src/Book'
import { PaperBook } from '../src/PaperBook'
import { Ebook } from '../src/Ebook'

let books: Book[] = []


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
]

type error = {
    id: number,
    name: string,
    text: string
}

let activeErrors: error[]

let formError: HTMLElement

let isPaperBook = true

document.addEventListener('DOMContentLoaded', () => {
    let name: string
    let price: number
    let weight: number
    let isbn: string

    formError = document.getElementById('form-error') as HTMLElement
    document.getElementById('input-area-weight')!.style.display = 'block'
    document.getElementById('input-area-size')!.style.display = 'none'
    setError(-1)

    showDatas()
    //#region name check
    document.getElementById('book-name')!.addEventListener('change', e => {
        let bookName = (e.currentTarget as HTMLInputElement).value

        if (checkBookName(bookName)) {
            setError(0)
        } else {
            removeError(0)
            name = bookName
        }

    });
    //#endregion

    //#region Price Check
    document.getElementById('book-price')!.addEventListener('change', e => {
        let bookPrice = (e.currentTarget as HTMLInputElement).value
        if (checkPrice(bookPrice)) {
            setError(1)
        } else {
            removeError(1)
            price = parseInt(bookPrice)
        }
    });
    //#endregion

    //#region Size check
    document.getElementById('book-size')!.addEventListener('change', e => {
        let bookSize = (e.currentTarget as HTMLInputElement).value
        if (checkWeightOrSize(bookSize)) {
            setError(1)
        } else {
            removeError(1)
            price = parseInt(bookSize)
        }
    });
    //#endregion

    //#region Weight check
    document.getElementById('book-weight')!.addEventListener('change', e => {
        let bookWeight = (e.currentTarget as HTMLInputElement).value
        if (checkWeightOrSize(bookWeight)) {
            setError(2)
        } else {
            removeError(2)
            weight = parseInt(bookWeight)
        }
    });
    //#endregion

    //#region Isbn checl
    document.getElementById('book-isbn')!.addEventListener('change', e => {
        let bookIsbn = (e.currentTarget as HTMLInputElement).value
        if (checkIsbn(bookIsbn)) {
            setError(3)
        } else {
            removeError(3)
            isbn = bookIsbn
        }
    });
    //#endregion

    document.getElementById('paper')!.addEventListener('change', e => {
        let value = (e.currentTarget as HTMLInputElement)
        if (value.checked) {
            isPaperBook = true
            document.getElementById('input-area-weight')!.style.display = 'block'
            document.getElementById('input-area-size')!.style.display = 'none'
        }
    })


    document.getElementById('ebook')!.addEventListener('change', e => {
        let value = (e.currentTarget as HTMLInputElement)
        if (value.checked) {
            isPaperBook = false
            document.getElementById('input-area-weight')!.style.display = 'none'
            document.getElementById('input-area-size')!.style.display = 'block'
        }
        console.log(isPaperBook)
    })

    document.getElementById('add-book')!.addEventListener('click', () => {
        name = (document.getElementById('book-name') as HTMLInputElement).value
        price = parseInt((document.getElementById('book-price') as HTMLInputElement).value)
        weight = parseInt((document.getElementById('book-weight') as HTMLInputElement).value)
        isbn = (document.getElementById('book-isbn') as HTMLInputElement).value
        if (isPaperBook) {
            if (!checkBookName(name) && !checkPrice(price.toString()) && !checkWeightOrSize(weight.toString()) && !checkIsbn(isbn)) {
                books.push(new PaperBook(name, price, isbn, weight))
                showDatas()
            }
        } else {
            if (!checkBookName(name) && !checkPrice(price.toString()) && !checkWeightOrSize(weight.toString()) && !checkIsbn(isbn)) {
                books.push(new Ebook(name, price, isbn, weight))
                showDatas()
            }
        }
        

    });




})

const checkBookName = (bookName: string) => {
    return bookName.length <= 0
}

const checkPrice = (bookPrice: string) => {
    return parseInt(bookPrice) < 0
}

const checkWeightOrSize = (bookWeight: string) => {
    return parseInt(bookWeight) <= 0
}

const checkIsbn = (bookIsbn: string) => {
    return bookIsbn != "" && bookIsbn.length != 13
}


const setError = (errorId: number) => {
    if (errorId == -1) {
        activeErrors = []
        formError!.style.display = 'none'
    } else {
        if (activeErrors.filter(e => e.id == errorId).length == 0) {
            activeErrors.push(errors.filter(e => e.id == errorId)[0]);
            activeErrors = activeErrors.sort((a, b) => a.id - b.id)
            console.log(activeErrors)
            formError!.textContent = activeErrors[0].text
            formError!.style.display = 'block'
        }
    }

}

const setNextError = () => {

    if (activeErrors.length > 0) {
        formError!.textContent = activeErrors[0].text
        formError!.style.display = 'block'
    } else {
        formError!.style.display = 'none'
    }

}

const removeError = (errorId: number) => {
    if (activeErrors.filter(e => e.id == errorId).length != 0) {

        console.log(activeErrors.indexOf(activeErrors.filter(e => e.id == errorId)[0]))
        console.log(activeErrors)
        activeErrors.splice(activeErrors.indexOf(activeErrors.filter(e => e.id == errorId)[0]), 1)
        console.log(activeErrors)
        setNextError()
    }
}

const showDatas = () => {
    let out = document.getElementById('out')
    out!.innerHTML = ''
    let bookCount = books.length + 'db könyv'
    let freeBookCount = books.filter(e => e.price == 0).length + 'db ingyenes könyv'
    let sumPrice = 0
    books.forEach(e => sumPrice += e.price)
    
    let p = document.createElement('p')
    p.innerHTML = bookCount + '<br>' + freeBookCount + '<br>' + sumPrice + '$'
    out!.append(p)
}

