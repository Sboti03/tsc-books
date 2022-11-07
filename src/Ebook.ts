import { Book } from "./Book";

export class Ebook implements Book {
    title: string;
    price: number;
    isbn: string;
    size : number;

    constructor(title : string, price : number, isbn : string, size : number) {
        this.title = title
        this.price = price
        this.isbn = isbn
        this.size = size
    }



    

}