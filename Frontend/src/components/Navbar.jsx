import React from 'react'
import { MdArrowOutward } from "react-icons/md";
const Navbar = () => {
    return (
        <>
            <div className='w-screen h-[60px] text-white flex items-center justify-between  px-32 py-15'>
                <div className="logo"><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png" alt="logo" className='w-[200px] h-[60px]' /></div>
                 <div className="links flex items-center justify-center ">
                <ul className='flex items-center justify-center gap-6 text-[17px] font-bold'>
                    <li>Swiggy Corporate</li>
                    <li>Partner with us</li>
                    <li className='px-7 py-3 border border-white rounded-lg flex items-center gap-2'>Get the app <MdArrowOutward className='text-[24px] font-bold' /></li>
                    <li className='px-7 py-3 bg-black rounded-lg'>Sign In </li>
                </ul>
            </div>
            </div>
           
        </>
    )
}

export default Navbar