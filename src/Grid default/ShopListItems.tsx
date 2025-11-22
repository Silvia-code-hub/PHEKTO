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
        image: "src/assets/images/image_030.jpg",
        name: "Accumsan tincidunt",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 2,
        image: "src/assets/images/image_034.jpg",
        name: "In nulla",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 3,
        image: "src/assets/images/image_032.jpg",
        name: "Vel sem",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 4,
        image: "src/assets/images/image_036.jpg",
        name: "Porttitor cum",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 5,
        image: "src/assets/images/image_031.jpg",
        name: "Nunc in",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 4,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 6,
        image: "src/assets/images/image_035.jpg",
        name: "Vitae facilisis",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 7,
        image: "src/assets/images/image_033.jpg",
        name: "Curabitur lectus",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 4,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
]