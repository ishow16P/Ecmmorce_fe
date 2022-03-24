import book1 from "./images/products/book/1.jpg"
import book2 from "./images/products/book/2.jpg"
import book3 from "./images/products/book/3.jpg"
import book4 from "./images/products/book/4.jpg"
import book5 from "./images/products/book/5.jpg"
import cloth2 from "./images/products/clothes/2.jpg"
import cloth6 from "./images/products/clothes/6.jpg"
import cloth7 from "./images/products/clothes/7.jpg"
import cloth5 from "./images/products/clothes/5.jpg"
import shoe1 from "./images/products/shoes/1.jpg"
import shoe4 from "./images/products/shoes/4.jpg"
import watch1 from "./images/products/watches/1.jpg"
import watch2 from "./images/products/watches/2.jpg"

export const silderItem = [
    {
        id: 1,
        imgURL: cloth7,
        title: "Little Things",
        desc: "an anthology of poetry"
    },
    {
        id: 2,
        imgURL: book2,
        title: "Jail Break",
        desc: "ESCAPING RELIGON"
    },
    {
        id: 3,
        imgURL: book3,
        title: "Findingg The Way",
        desc: "A Novel of Laotzu"
    }
]

export const categories = [
    {
        id: 1,
        categoryId: "",
        categotyName: "Clothes",
        imgUrl:cloth7
    },
    {
        id: 2,
        categoryId: "",
        categotyName: "Watches & Glasses",
        imgUrl:watch1
    },
    {
        id: 3,
        categoryId: "",
        categotyName: "Shoes",
        imgUrl:shoe1
    },
    {
        id: 4,
        categoryId: "",
        categotyName: "Books",
        imgUrl:book1
    },
]

export const popularProduct = [
    {
        id:1,
        categoryId:"1",
        merchantId:"1234",
        productName: "Jacket-Cream",
        description: "Creamy Women's Jacket",
        price: "1299",
        quantity:100,
        imgUrl:cloth2
    },
    {
        id:2,
        categoryId:"1",
        merchantId:"1234",
        productName: "Jacket-Jean",
        description: "Women's Jacket",
        price: "1299",
        quantity:100,
        imgUrl:cloth6
    },
    {
        id:3,
        categoryId:"4",
        merchantId:"1234",
        productName: "Notebook Mockup",
        description: "this is a book the best",
        price: "390",
        quantity:200,
        imgUrl:book5
    },
    {
        id:4,
        categoryId:"3",
        merchantId:"1234",
        productName: "High-Heels Green",
        description: "as tall as a building",
        price: "799",
        quantity:30,
        imgUrl:shoe4
    },
    {
        id:5,
        categoryId:"3",
        merchantId:"1234",
        productName: "Canvas Shoes(Red)",
        description: "The best is Shoes",
        price: "3990",
        quantity:99,
        imgUrl:shoe1
    },
    {
        id:6,
        categoryId:"2",
        merchantId:"1234",
        productName: "Silverdeep",
        description: "New product from Rolex",
        price: "399000",
        quantity:20,
        imgUrl:watch1
    },
    {
        id:7,
        categoryId:"2",
        merchantId:"1234",
        productName: "Pink Gold",
        description: "Watch for women",
        price: "8990",
        quantity:220,
        imgUrl:watch2
    },
    {
        id:8,
        categoryId:"4",
        merchantId:"1234",
        productName: "Make Money",
        description: "How to Start and Operate",
        price: "450",
        quantity:220,
        imgUrl:book4
    },

]