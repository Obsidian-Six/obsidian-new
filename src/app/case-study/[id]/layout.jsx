import Footer from '@/app/_components/footer'
import Navbar from '@/app/_components/navbar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <div className='min-h-screen'>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default layout