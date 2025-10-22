import React, { useState } from "react";
import { type SideBar, type FilterData, type FilterOptions, Type } from "./SidebarItems";
import "./Sidebar.css"
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';
import Layout from "../Components/layout";

interface SidebarItemProps {
  item: SideBar;
}

const SideBarr: React.FC<FilterOptions> =({filters, onFilterChange}) =>{
  const [filterData] = useState<FilterData>({

  brands: [
    "Coaster Furniture",
    "Fusion Dot High Fashion",
    "Unique Furniture Restor",
    "Dream Furniture Flipping",
    "Young Repurposed",
    "Green DIY furniture"
  ],
  discountOffers: [
    "20% Cashback",
    "5% Cashback Offer",
    "25% Discount Offer",
  ],
 categories:["Prestashop",
  "Magento",
  "Bigcommerce",
  "osCommerce",
  "3dcart",
  "Bags",
  "Accessories",
  "Jewellery",
  "Watches",
],
priceRange:[
{id:1,label:"$0.00 - $150.00",min:0.00,max:150.00},
{id:2,label:"$150.00 - $350.00",min:150.00,max:300.00},
{id:3,label:"$350.00 - $450.00",min:350.00,max:450.00},
{id:4,label:"$450.00 +",min:450.00,max:1000.00},
],
colors:[
  {id:1, name: "Blue", value: "#5E37FF"},
  {id:2, name: "Orange", value: "#FF9437"},
  {id:3, name: "Brown", value: "#FFBF95"},
  {id:4, name: "Green", value: "#33D221"},
  {id:5, name: "Purple", value: "#E248FF"},
  {id:6, name: "Sky", value: "#26CBFF"},
],

}
);

  
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    discounts: true,
    ratings: true,
    categories: true,
    price: true,
    colors: true
  });
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleRatingFilter = (rating: number) => {
    onFilterChange("categories", `rating-${rating}`);
  };

console.log('SideBarr component rendering');
console.log('Filters prop:', filters);
console.log('filterData:',filterData);
console.log('Brands count:',filterData.brands.length);
console.log(' Discounts count:', filterData.discountOffers.length);
console.log(' Expanded sections:', expandedSections);


 


return(
    <div className="side-bar-info">
        <div className="brands-section" onClick={() =>toggleSection("brands")}>
            <h3 className="side-heading">Product Brand</h3>
             
         </div>
        {expandedSections.brands && (
          <div className="section-content">
            {filterData.brands.map(brand => (
              <label key={brand} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => onFilterChange("brands", brand)}
                />
                <span className="checkmark"></span>
                {brand}
              </label>
            ))}
          </div>
        )}
         <div className="discount-section" onClick={() => toggleSection("discounts")}>
          <h3 className="side-heading">Discount Offer</h3>
          <span className="toggle-icon">{expandedSections.discounts ? "−" : "+"}</span>
        </div>
        {expandedSections.discounts && (
          <div className="section-content">
            {filterData.discountOffers.map((offer: string) => (
              <label key={offer} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.discountOffers.includes(offer)}
                  onChange={() => onFilterChange("discountOffers", offer)}
                />
                <span className="checkmark"></span>
                {offer} 
              </label>
            ))}
          </div>
        )}
        <div className="Rating-section" onClick={() => toggleSection("ratings")}>
          <h3 className="side-heading">Rating Item</h3>
          <span className="toggle-icon">{expandedSections.ratings ? "−" : "+"}</span>
        </div>
        {expandedSections.ratings && (
          <div className="section-content">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="rating-item" onClick={() => handleRatingFilter(rating)}>
                <div className="stars">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={i < rating ? "star-filled" : "star"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text"></span>
              </div>
            ))}
          </div>
        )}
        <div className="categories-section" onClick={() => toggleSection("categories")}>
          <h3 className="side-heading">Categories</h3>
          <span className="toggle-icon">{expandedSections.categories ? "−" : "+"}</span>
        </div>
        {expandedSections.categories && (
          <div className="section-content">
            {filterData.categories.map(category => (
              <label key={category} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => onFilterChange("categories", category)}
                />
                <span className="checkmark"></span>
                {category}
              </label>
            ))}
          </div>
        )}
        <div className="price-section" onClick={() => toggleSection("price")}>
          <h3 className="side-heading">Price Range</h3>
          <span className="toggle-icon">{expandedSections.price ? "−" : "+"}</span>
        </div>
        {expandedSections.price && (
          <div className="section-content">
            {filterData.priceRange.map(range => (
              <label key={range.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.priceRange.includes(range.id)}
                  onChange={() => onFilterChange("priceRange", String(range.id))}
                />
                <span className="checkmark"></span>
                {range.label}
              </label>
            ))}
          </div>
        )}
        <div className="colors-section" onClick={() => toggleSection("colors")}>
          <h3 className="side-heading">Filter by Color</h3>
          <span className="toggle-icon">{expandedSections.colors ? "−" : "+"}</span>
        </div>
        {expandedSections.colors && (
          <div className="section-content color-filters">
            {filterData.colors.map(color => (
              <label key={color.id} className="color-item">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(String(color.id))}
                  onChange={() => onFilterChange("colors", String(color.id))}
                />
                <span 
                  className="color-dot" 
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                ></span>
                <span className="color-name">{color.name}</span>
              </label>
            ))}
          </div>
        )}

    </div>
    
      
 );
};
const SidebarItem: React.FC<SidebarItemProps> = ({item}) =>{
    const { image, name, colors, description, rating, price, oldPrice } = item;
    return(
        
            <div className="third-container">
                <div className="pic-container">
                    <img src={image} alt={name}/>
                </div>
                <div className="pic-info">
                    <div className="p-1">
                        <h3 className="image-name">{name}</h3>
                                <div className="color-dots">
                                  {colors.map((color, id) => (
                                    <span 
                                      key={id} 
                                      className="dot" 
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                        
                                </div>
                    </div>
                    <div className="p-2">
                        <div className="pricing">
                          <span className="new-price">${price.toFixed(2)}</span>
                          <span className="old-price">${oldPrice.toFixed(2)}</span>
                        </div>
                        <div className="sidebar-product-rating">
        
                            {Array(5)
                           .fill(null)
                           .map((_, i) => (
                            <span key={i} className={i < rating ? 'star-filled' : 'star-empty'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="p-3">
                        <p className="description">{description}</p>
                        </div>
                        <div className="sidebar-icons">
                                  <FaShoppingCart/>
                                  <FaRegHeart/>
                                  <FaSearchPlus/>
                        
                                </div>
                    </div>
                </div>
            </div>
      

    )
};

const Sidee: React.FC = () =>{

  const [filters, setFilters] = useState({
    brands: [],
    discountOffers: [],
    ratings: [],
    categories: [],
    priceRange: [],
    colors: []
  });
   if (!Type || !Array.isArray(Type)) {
    console.error('Type data is not available or not an array');
    return (
      <Layout>
        <div className="Big-container">
          <div>Error: Product data not available</div>
        </div>
      </Layout>
    );
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[filterType as keyof typeof prev] as string[];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterType]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentFilters, value]
        };
      }
    });
  };
  console.log('Sidee component rendering');
  console.log('Type data:', Type);
    return(
        <Layout>
         <div className="Big-container">
            <div className="first-part">
                <h2 className="first-heading"> Shop Left Sidebar</h2>
                <div className="buttons">
                  <div><button className="nav-link">Home</button></div>
                  <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                  <ul><li><div><button className="nave-link">Shop Left Sidebar</button></div></li></ul> 

                </div>
            </div>
            <div className="second-part">
                <h3 className="second-heading">Ecommerce Acceories & Fashion item </h3>
                <p className="small-text">About 9,620 results (0.62 seconds)</p>

            </div>
            <div className="main-content-layout">
                <div className="sidebar-section">
            <SideBarr filters={filters} onFilterChange={handleFilterChange} />
          </div>


             <div className="products-section">
                 <div className="items-container">
           {Type.map((item) => (
            <SidebarItem key={item.id} item={item} />
           ))}
        </div>
        <div className="adt-container">
         <div className="adt-image">
            <img src="src/assets/images/image_015.png" alt="" />
          </div>
        </div>

            </div>

            </div>
            
          
        </div>
        </Layout>

    )
}

export default Sidee;