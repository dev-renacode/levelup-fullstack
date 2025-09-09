import logo from '../../assets/img/level_up_logo.png'
import cartIcon from '../../assets/icon/cart.svg'

const Navbar = () => {
  return (
    <div className='bg-black border-b-2 border-green-500'>
      <header className='flex text-white justify-between px-5 py-2 max-w-7xl mx-auto'>
        <div className='flex items-center'>
          <article>
              <img className='w-25' src={logo} alt="logo" />
          </article>
          
          <nav className='ml-5'>
              <ul className='flex gap-4'>
                  <li><a className='px-3 py-2 rounded-lg hover:bg-[#1E90FF] transition-colors duration-200' href="#">Home</a></li>
                  <li><a className='px-3 py-2 rounded-lg hover:bg-[#1E90FF] transition-colors duration-200' href="#">Productos</a></li>
                  <li><a className='px-3 py-2 rounded-lg hover:bg-[#1E90FF] transition-colors duration-200' href="#">Nosotros</a></li>
                  <li><a className='px-3 py-2 rounded-lg hover:bg-[#1E90FF] transition-colors duration-200' href="#">Blog</a></li>
                  <li><a className='px-3 py-2 rounded-lg hover:bg-[#1E90FF] transition-colors duration-200' href="#">Contacto</a></li>
              </ul>
          </nav>
        </div>

        <div className='flex items-center gap-2'>
          <img className='w-7 h-7' src={cartIcon} alt="cart icon" />
          <p>Cart(0)</p>
        </div>
      </header>
    </div>
  )
}

export default Navbar