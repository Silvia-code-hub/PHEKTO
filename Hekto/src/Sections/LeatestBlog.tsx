
import { FaPenNib } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
interface BlogItem{
    id:number;
    image:string;
    name:string;
    date:string;

}
interface BlogProps{
    item:BlogItem;
}
const Blog: React.FC<BlogProps> =({item}) =>{
    return(
        <div className="w-full max-w-sm sm:max-w-md lg:w-[370px] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="w-full h-48 sm:h-56 md:h-64 lg:h-[255px] overflow-hidden">
                 <img 
                 src={item.image} 
                 alt={item.name} 
                 className="w-full h-full object-cover rounded-t-lg"/>
            </div>
            <div className="flex gap-4">
               
                <div key={item.id} className="flex gap-3 mb-5">
                        <span className=" text-custom-pink"><FaPenNib/></span>
                           <span className="font-normal text-sm text-blue-shade leading-[1.00] h-[14px] w-[55px] mr-3">{item.name}</span>
                               <span className=" text-hard-yellow "><FaCalendarDays/></span>
                                   <span className="font-normal text-sm text-blue-shade leading-[1.00] h-[14px] w-[97px]">{item.date}</span>
                    </div>
                         
                    

                
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-lg text-blue-shade leading-[1.00] w-[248px] h-[18px] mb-5">Top essential trends in 2021</h2>
                <p className="font-normal text-base text-deep-gray leading-[30px] w-[301px] h-[60px] " >More off this less hello samlande lied much over tightly circa horse taped mightly</p>
                <button className="font-normal text-base leading-[30px] underline text-left w-[87px] h-[30px] text-blue-shade mt-10 cursor-pointer hover:text-custom-pink">Read More</button>
            </div>
        </div>
    )
}
export default Blog;