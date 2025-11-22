import './Header.css';
import { FaRegUser, FaRegHeart, FaShoppingCart, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

function Header() {

  return (


    <header className='flex justify-between items-center'>


      <div className="contact-info flex justify-between items-center gap-2 p-2">
        <FaEnvelope /> email:mhhasanul@gmail.com
        <FaPhoneAlt /> phone:(12345)67890
      </div>

      <div className='flex justify-between items-center gap-2 p-2'>
        <form>
          <select name="language" id="language">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Dutch">Dutch</option>
            <option value="Chinese">Chinese</option>
          </select>
        </form>

        <form>
          <select name="currency" id="currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="KES">KES</option>
            <option value="CNY">CNY</option>
          </select>
        </form>

        <ul><li key="login"><a href="#">login <FaRegUser /> </a></li></ul>

        <ul><li key="wishlist"><a href="#">Wishlist <FaRegHeart /> </a></li></ul>


        <span className='shopping-cart'><FaShoppingCart /></span>
      </div>

    </header>
  )
}



export default Header;