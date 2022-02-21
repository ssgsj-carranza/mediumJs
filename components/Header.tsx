import Link from "next/link";


function Header() {
  return ( 
    <header>
      <div className="flex items-center space-x-5">
        <Link href='/'>
            <img className='object-contain w-44 cursor-pointer'
                 src='https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png' 
                 alt=''
            />
        </Link>
        <div className='hidden md:inline-flex items-center space-x-5'>
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className='text-white bg-green-600 rounded-full px-4 py-1 cursor-pointer'>Follow</h3>
        </div>
      </div>
      
      <div>

      </div>
    </header>
  );
}

export default Header