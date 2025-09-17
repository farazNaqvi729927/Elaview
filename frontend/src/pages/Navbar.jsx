import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';



function Navbar() {

    const [position, setPosition] = useState("bottom")
    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        nav('/')
        toast.success('Successfully Logged Out!')
    }

    return (
        <div className='flex justify-between items-center p-5 fixed top-0 left-0 w-full z-50 border-b bg-gray-100 shadow-md'>
            <Link to='/home'><img alt="Elaview" className='h-10 w-15' src={logo} /></Link>


            <div className='space-x-8 max-sm:hidden'>
                <Link to='/home' className='font-sans text-sm font-medium text-gray-700'>Home</Link>
                <Link to='/browse' className='font-sans text-sm font-medium text-gray-700'>Browse Spaces</Link>
            </div>


            <div className='max-sm:hidden'>
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


            {/*Dropdown Menu */}
            <div className='sm:hidden' >
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Menu size={25} className="p-[2px] text-2xl cursor-pointer" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-56 bg-white [scrollbar-gutter:stable]"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Link
                                to="/home"
                                onClick={() => setPosition("top")}
                                className={`block w-full font-sans text-sm px-2 py-1 rounded transition 
          ${position === "top" ? "font-bold text-black bg-gray-100" : "font-medium text-gray-700 hover:bg-gray-50"}`}
                            >
                                Home
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link
                                to="/browse"
                                onClick={() => setPosition("bottom")}
                                className={`block w-full font-sans text-sm px-2 py-1 rounded transition 
          ${position === "bottom" ? "font-bold text-black bg-gray-100" : "font-medium text-gray-700 hover:bg-gray-50"}`}
                            >
                                Browse Spaces
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <button
                                onClick={() => { setPosition("right"); handleLogout(); }}
                                className={`block w-full text-left font-sans text-sm px-2 py-1 rounded transition 
          ${position === "right" ? "font-bold text-black bg-gray-100" : "font-medium text-gray-700 hover:bg-gray-50"}`}
                            >
                                Logout
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </div>
    )
}

export default Navbar
