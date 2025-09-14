import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom' // ✅ use react-router-dom, not react-router
import toast from 'react-hot-toast';



function Navbar() {

    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        nav('/')
        toast.success('Successfully Logged Out!')
    }

    return (
        <div className='flex justify-between items-center p-5 fixed top-0 left-0 w-full z-50 border-b bg-gray-100 shadow-md'>
            <Link to='/home'><img alt="Elaview" className='h-10 w-15' src={logo} /></Link>

            <div className='space-x-8'>
                <Link to='/' className='font-sans text-sm font-medium text-gray-700'>Home</Link>
                <Link to='/browse' className='font-sans text-sm font-medium text-gray-700'>Browse Spaces</Link>
            </div>


            {
                localStorage.getItem('token') ?

                    <div className='flex items-center gap-5'>
                        <button onClick={handleLogout} className='font-sans text-sm font-medium text-gray-700 border border-gray-400 p-2 rounded'>
                            LOGOUT
                        </button>
                    </div>
                    :
                    <div className='flex items-center gap-5'>
                        <Link to='/' className='font-sans text-sm font-medium text-gray-700 border border-gray-400 p-2 rounded'>
                            SIGN IN
                        </Link>

                        <Link to='/signup' className='font-sans text-sm font-medium text-gray-700 border border-gray-400 p-2 rounded'>
                            SIGN UP
                        </Link>
                    </div>

            }

        </div>
    )
}

export default Navbar
