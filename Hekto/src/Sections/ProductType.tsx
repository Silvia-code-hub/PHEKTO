export interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  image: string;
  
}


export const products: Product[] = [
  {
    id: 1,
    name: "Cantilever chair",
    code: "Y523201",
    price: 42.00,
    image: "src/assets/images/image_0.png",
    
  },
  {
    id: 2,
    name: "Cantilever chair",
    code: "Y523201",
    price: 42.00,
    image: "src/assets/images/image_1.png",
   
  },
  {
    id: 3,
    name: "Cantilever chair",
    code: "Y523201",
    price: 42.00,
    image: "src/assets/images/image_1169.png",
   
  },
  {
    id: 4,
    name: "Cantilever chair",
    code: "Y523201",
    price: 42.00,
    image: "src/assets/images/image_3.png",
    
  }
];