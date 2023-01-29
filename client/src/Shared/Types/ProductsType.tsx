export type ProductType = {
    _id:string,
    title:string,
    description : string,
    price:string,
    currency:string,
    category : string,
    image:string,
    stock:string,
}

export type ProductsType = ProductType[];
