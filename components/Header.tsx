import Link from "next/link";


function Header() {
  return ( 
    <header>
      <div>
        <Link href='/'>
            <img className='object-contain w-44 cursor-pointer'
                 src='https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png' 
                 alt=''
            />
        </Link>
      </div>
      
      <div>

      </div>
    </header>
  );
}

export default Header