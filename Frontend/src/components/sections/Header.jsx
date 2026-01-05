import React from 'react'
import Navbar from '../Navbar'
import { FaLocationDot } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
const Header = () => {
    return (
        <>
            <div className='w-screen h-full bg-[#FF5200] '>
                <Navbar />

                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" alt="" className='w-[200px] h-[500px] absolute top-20 ' />
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" alt="" className='w-[200px] h-[500px] absolute top-20 right-0 ' />
                <div className='flex items-center justify-center mt-[100px]'>
                    <h1 className='text-white text-[50px] font-bold text-center'>Order food & groceries. Discover <br />best restaurants. Swiggy it!</h1>


                </div >
                <div className='flex items-center justify-center mt-[10px] gap-5'>
                    <div className='flex items-center gap-2 bg-white rounded-xl px-5 py-5'>
                        <FaLocationDot className='text-[#FF5200] text-[24px]' />
                        <input type="text" placeholder='Enter your delivery location' className='w-[280px] border-none outline-none placeholder:text-[17px] placeholder:text-zinc-500 placeholder:font-semibold' />
                        <FaChevronDown />
                    </div>
                    <div className='flex items-center gap-2 bg-white rounded-xl px-5 py-5'>
                        <input type="text" className='w-[500px] border-none outline-none placeholder:text-[17px] placeholder:text-zinc-500 placeholder:font-semibold'
                            placeholder='Search for restrants, items or more' />
                        <IoIosSearch className='text-[24px]' />

                    </div>

                </div>
                <div className='flex items-center mt-[30px] justify-center gap-5'  >
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png" alt="" className='w-[320px] h-[300px]'/>
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png" alt="" className='w-[320px] h-[300px]'/>
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png" alt="" className='w-[320px] h-[300px]'/>
                </div>
            </div>
        </>
    )
}

export default Header