import React from 'react'
import Header from './_components/Header';
import Footer from './_components/Footer';

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='m-4'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Provider