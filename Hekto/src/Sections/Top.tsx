 
interface TopItem{
    id:number;
    image:string;
    name:string;
    price:number;

}
interface TopProps{
    item:TopItem;
}
const Top: React.FC<TopProps> =({item}) =>{
    
    return(
        
        <div className="w-[269px] h-[345px] bg-white">
            <div className="relative w-[269px] h-[269px] bg-cream-white rounded-full border-4 border-1-transparent hover:border-purple-main">
                <div className="absolute inset-0 w-full h-full bg-cream-white rounded-full transform translate-x-1 ">
              <div className="w-[178px] h-[178px] pt-20 pl-20 ">
                  <img src={item.image} alt={item.name} />
               </div>
               <button className="bg-light-green w-[94px] h-[29px] font-medium text-xs leading-[1.00] text-white ml-20 mt-2 opacity-0 hover:opacity-100 px-2  ">View Shop</button>
            </div>
            </div>
            
            
            <div className="w-full h-[56px] text-center mt-2">
               <h2 className="font-normal text-blue-shade text-[20px] leading[1.00] h-[20px]">{item.name}</h2>
               <div className="font-normal text-[16px] h-[16px] leading-[1.00] text-blue-shade mt-3">${item.price.toFixed (2)}</div> 
            </div>
            <ul> </ul>

         </div>


    )
}
export default Top;