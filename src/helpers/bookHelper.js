import { updateBook } from "@/services/book.service";

export const changeBooksPrice = async (books, priceChange) => {
    const bks = books.map(b => {
        return {
            id: b.id, 
            name: b.name, 
            price: b.price
        }
    })

    for(var b of bks) {
        b.price += priceChange;
        await updateBook(b.id, b);
    }
}