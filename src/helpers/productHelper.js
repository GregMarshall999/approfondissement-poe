import { updateProduct } from "@/services/product.service";

export const parseHalfPrice = price => {
    let hp = price / 2;

    if(hp % 1 != 0) {
        let precision = hp.toPrecision(3);

        if(precision.split('.')[1].length > 2) {
            return precision.substring(0, precision.split('.')[0].length + 3);
        }

        return precision.toString();
    }

    return hp;
};

export const changeProductsPrice = async (products, priceChange) => {
    const prods = products.map(p => {
        return {
            id: p.id, 
            name: p.name, 
            price: p.price
        }
    })

    for(var p of prods) {
        p.price += priceChange;
        await updateProduct(p.id, p);
    }
}