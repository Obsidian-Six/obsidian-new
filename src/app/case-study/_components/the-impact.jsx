import React from 'react'

const TheImpact = ({ele}) => {
  return (
    <>
        <div className='w-[80%] mx-auto'>
            <div className='md:text-6xl sm:text-4xl text-3xl poppins font-light self-center md:my-32 my-10 flex flex-col justify-center items-center textmain'>
                THE IMPACT
                <svg xmlns="http://www.w3.org/2000/svg" width="148" height="14" viewBox="0 0 148 14" fill="none" className="w-24 md:w-36 mt-2 md:ml-20">
                    <g clipPath="url(#clip0_2382_1860)">
                        <path d="M147.404 8.08289C146.252 7.43553 145.309 6.47793 138.484 5.25601C136.15 4.84945 133.82 4.40929 131.484 4.01953C114.042 1.54881 112.525 1.64065 99.6568 0.596807C92.7641 0.155527 85.8536 0.123047 78.9514 -0.000152834C74.0845 -0.0124728 69.2166 0.174567 64.3508 0.279847C38.1481 1.51745 47.2661 0.860007 29.0092 2.59265C21.1427 3.73169 13.2949 5.04097 5.43465 6.23713C4.26255 6.50705 3.0727 6.70417 1.91626 7.04577C0.636653 7.42881 0.588642 7.41313 0.40599 7.59233C-0.427945 8.23969 0.0949607 9.84801 1.31612 9.55233C4.86373 8.49169 4.68526 8.59249 19.9007 6.23041C20.3453 6.73217 20.6615 6.60897 21.8232 6.57873C23.1999 6.54289 24.5765 6.51937 25.9522 6.45329C31.5371 6.02657 37.1075 5.37585 42.6893 4.89089C44.6108 4.74529 46.5302 4.54145 48.4517 4.36449C50.8742 4.23457 53.2977 4.10801 55.7213 3.98369C68.2752 3.74177 64.6409 3.63313 80.2122 3.81345C82.6566 3.92433 80.3761 3.79329 93.3339 4.58625C103.417 5.58081 114.304 7.71553 124.168 9.75169C128.433 10.6376 136.345 12.3501 140.482 13.871C140.88 13.9886 141.346 13.8408 141.579 13.4701C141.91 13.0534 141.857 12.3837 141.498 11.9995C141.158 11.6501 140.648 11.6142 140.226 11.4306C138.359 10.7754 135.614 10.0765 133.581 9.57585L136.311 9.94321C138.714 10.2938 141.142 10.3822 143.549 10.6992C144.676 10.8067 146.203 10.9019 147.133 10.2075C147.369 10.035 147.64 9.89953 147.781 9.61729C148.069 9.10321 147.899 8.37857 147.406 8.08513L147.404 8.08289ZM96.5862 2.66209C100.515 2.81889 112.658 3.87729 117.11 4.33537C121.906 4.95249 126.701 5.57073 131.488 6.26065C134.019 6.79489 139.225 7.51617 142.105 8.29233C140.866 8.16353 139.624 8.07169 138.384 7.94961C124.455 6.16881 110.538 4.25137 96.5862 2.66209Z" fill="#5A00EC"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2382_1860">
                        <rect width="148" height="14" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            {
                ele.impact.map((item , j) => (
                    < div key={j}>
                    <div className='grid md:grid-cols-2 md:gap-32 sm:gap-10 gap-6 items-center'>
                        <p className='md:text-6xl sm:text-4xl text-2xl  poppins font-semibold textmain leading-normal'>{item.name}</p>
                        <p className='md:text-2xl sm:text-xl text-lg inter font-normal textmain leading-normal'>{item.detail}</p>
                    </div>
                    <div className='bg-[#5A00EC] h-[1px] md:w-[60%] mx-auto md:my-16 sm:my-10 my-6'/>
                    </div>

                ))
            }
        </div>
        <div className='bg-[#5A00EC] md:my-32 my-10'>
            <p className='text-white md:text-5xl sm:text-3xl text-2xl font-semibold poppins md:w-[60%] w-[80%] mx-auto leading-normal md:py-28 py-10 '>
           {ele.detail}
            </p>
        </div>
        <div className='md:my-32 my-10'>
            <img src='/images/logo/logo2.png' alt='No Preview' className='md:h-44 h-20 mx-auto' />
        </div>
    </>
  )
}

export default TheImpact




// <div className='grid md:grid-cols-2 md:gap-32 sm:gap-10 gap-6 items-center'>
// <p className='md:text-6xl sm:text-4xl text-2xl  poppins font-semibold textmain leading-normal'>Revenue Growth</p>
// <p className='md:text-2xl sm:text-xl text-lg inter font-normal textmain leading-normal'>Online sales now contribute significantly to their overall revenue.</p>
// </div>

// <div className='bg-[#5A00EC] h-[1px] md:w-[60%] mx-auto md:my-16 sm:my-10 my-6'/>

// <div className='grid md:grid-cols-2 md:gap-32 sm:gap-10 gap-6 items-center'>
// <p className='md:text-6xl sm:text-4xl text-2xl  poppins font-semibold textmain leading-normal'>Sustained Online Engagement</p>
// <p className='md:text-2xl sm:text-xl text-lg inter font-normal textmain leading-normal'>Ongoing social media and digital marketing ensure long-term success.</p>
// </div>