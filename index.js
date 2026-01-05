
    try {
        
        const {bhim , pin ,trn-id ,amt, rec bhim } = req.body
         if(!bhim|| !amt|| !pin) 0 proceed
    } catch (error) {
        
    }
 <div className='flex items-center justify-center mt-[80px]'>
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