
import  './Herosection.css';

const HeroSection = () => {
  return(
    <div className="herosection-container">
      <div className="promotional-image left">
        <img src="/src/assets/images/image_32.png"  />
      </div>

      <div className='hero-content'>
        <h3 className="hero-subtitle">Best Furniture For Your Castle....</h3>
        <h1 className="hero-title">New Furniture Collection Trends in 2020</h1>
        <h2 className="hero-Subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.</h2>
        <button className='hero-btn'> Shop Now
          
          </button>
      </div>
      <div className='promotional-image right'>
        <img src="/src/assets/images/sofa promotional header.png" alt="" />
      </div>
      

    </div>
   )
}

/*interface HeroSectionProps {
    leftImage: string;
    rightImage: string;
    subHeading:string;
    mainHeading:string;
    description:string;
    buttonText:string;
}
const HeroSection = (props :HeroSectionProps) => {
    return (
        <section className={styles.herocontainer}>
            <div className={styles.imageContainer}>
                <img src={props.leftImage} alt="image_32.png" className={styles.sideImage}/>  
              </div>
              <div className={styles.contentCenter}>
        <h2 className={styles.subHeading}>{props.subHeading}</h2>
        <h1 className={styles.mainHeading}>{props.mainHeading}</h1>
        <h3 className={styles.description}>{props.description}</h3>
        
        <button className={styles.shopNowButton}>
          {props.buttonText}
          <span className={styles.arrow}>&rarr;</span>
        </button>
      </div>

      <div className={styles.imageContainer}>
        <img 
          src= {props.rightImage} 
          alt="sofa promotional header.png" 
          className={styles.sideImage}
        />
      </div>
    </section>
  );
};*/

export default HeroSection;

    