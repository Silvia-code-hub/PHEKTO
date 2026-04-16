export  interface shop{
    id: number;
  name: string;
  image: string;
  colors:string[]
  price: number;
  oldPrice: number; 
  rating:number;
  description:string;
}
export const Type:shop[]= [
    {
        id: 1,
        image: "https://res.cloudinary.com/dua4go47y/image/upload/v1775565295/products/product_13.png",
        name: "Accumsan tincidunt",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dua4go47y/image/upload/v1775565296/products/product_14.png",
        name: "In nulla",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dua4go47y/image/upload/v1775565295/products/product_15.png",
        name: "Vel sem",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 4,
        image: "https://res.cloudinary.com/dua4go47y/image/upload/v1775565295/products/product_16.png",
        name: "Porttitor cum",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 5,
        image: "https://res.cloudinary.com/dua4go47y/image/upload/v1775565295/products/product_17.png",
        name: "Nunc in",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 4,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 6,
        image: "https://res.cloudinary.com/dua4go47y/image/upload/v1775565295/products/product_18.png",
        name: "Vitae facilisis",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 7,
        image: "https://res.cloudinary.com/dua4go47y/image/upload/v1775565295/products/product_19.png",
        name: "Curabitur lectus",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 4,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
]