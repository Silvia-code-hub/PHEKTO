import Feature from "./Discount"


const DiscGrid: React.FC = () => {
    return(
     <div className="flex-wrap mt-[150px]">
      <p className=" w-full text-center text-blue-shade font-bold text-[42px]  mt-[20px] mb-[30px]">Discount Item</p> 
      <div className="gap-[20px] flex w-full justify-center mt-3  ">
        <div><button className="text-blue-shade hover:text-custom-pink hover:underline font-normal text-[18px]">Wood Chair</button></div>
      <div><button className="text-blue-shade hover:text-custom-pink hover:underline font-normal text-[18px]">Plastic Chair</button></div>
      <div><button className="text-blue-shade hover:text-custom-pink hover:underline font-normal text-[18px]">Sofa Collection</button></div>
      
      </div>
      <Feature/>
      </div>
    )
}
export default DiscGrid;