import React from 'react'
import { BsArrowRightCircle } from "react-icons/bs";

const HomeService = () => {
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <div className='text-6xl font-light poppins uppercase'>Services</div>
        <div className='grid grid-cols-3 gap-24 my-10 items-end'>
            <div>
                <div className='flex items-center justify-between text-2xl headmain poppins py-5 border-b border-b-[#19183A]/20'>BRANDING <BsArrowRightCircle /></div>
                <div className='flex items-center justify-between text-2xl textmain poppins py-5 border-b border-b-[#19183A]/20'>WEB DEVELOPMENT <BsArrowRightCircle /></div>
                <div className='flex items-center justify-between text-2xl textmain poppins py-5 border-b border-b-[#19183A]/20'>DIGITAL MARKETING <BsArrowRightCircle /></div>
            </div>
            <div className='col-span-2'>
                <img src='https://designshack.net/wp-content/uploads/responsive-website-app-templates.jpg' alt='No Preview' className='h-[26rem] w-full' />
                <div className='flex gap-24 mt-5'>
                    <div className='text-4xl font-light poppins uppercase'>Branding <p className='h-[1px] bg-[#5A00EC] w-[80%] ml-auto' /></div>
                    <p className='textmain inter opacity-90'>We’ll craft unique brand identities, including logos, color schemes, and messaging, to help your business stand out and leave a lasting impression.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeService