
export interface SideBar{
    
   id: number;
  name: string;
  image: string;
  colors:string[]
  price: number;
  oldPrice: number; 
  rating:number;
  description:string;
}
export interface FilterData {
  brands: string[];
  discountOffers: string[];
  categories: string[];
  priceRange: {
    id: number;
    label: string;
    min: number;
    max: number;
  }[];
  colors: {
    id: number;
    name: string;
    value: string;
  }[];
}

export interface FilterOptions {
  filters:{
  brands: string[];
  discountOffers: string[];
  ratings: number[];
  categories: string[];
  priceRange: {
    includes(id: number): boolean | undefined; min: number; max: number 
};
  colors: string[];
  }
   onFilterChange: (filterType: keyof FilterOptions['filters'], value: string) => void
}
export const Type:SideBar[] =[

    {
        id: 1,
        image: "src/assets/images/image_037.jpg",
        name: "Dictum morbi",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 2,
        image: "src/assets/images/image_040.jpg",
        name: "Sodales sit",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 3,
        image: "src/assets/images/image_038.jpg",
        name: "Nibh varius",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 4,
        image: "src/assets/images/image_039.jpg",
        name: "Mauris quis",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 5,
        image: "src/assets/images/image_042.jpg",
        name: "Morbi sagittis",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 6,
        image: "src/assets/images/image_043.jpg",
        name: "Ultricies venenatis",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
    {
        id: 7,
        image: "src/assets/images/image_041.jpg",
        name: "Scelerisque dignissim",
        colors: ["#DE9034","#EC42A2","#8568FF"],
        price: 26.00,
        oldPrice: 52.00,
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
    },
]