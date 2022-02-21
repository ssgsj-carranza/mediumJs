import Link from "next/link";


function Header() {
  return ( 
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href='/'>
            <img className='object-contain w-44 cursor-pointer'
                 src='https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png' 
                 alt=''
            />
        </Link>
        <div className='hidden md:inline-flex items-center space-x-5 font-semibold'>
            <h3 className='hover:shadow-lg rounded-full px-4 py-1 transition duration-200 ease-out cursor-pointer'>About</h3>
            <h3 className='hover:shadow-lg rounded-full px-4 py-1 transition duration-200 ease-out'>Contact</h3>
            <button className='text-white bg-green-600 rounded-full px-4 py-1 cursor-pointer hover:shadow-lg hover:animate-pulse'>Follow</button>
        </div>
      </div>
      
      <div className='flex items-center space-x-5 text-green-600'>
        <h3>Sign In</h3>
        <h3 className='border px-4 py-1 rounded-full border-green-600'>Get Started</h3>
      </div>
    </header>
  );
}

export default Header