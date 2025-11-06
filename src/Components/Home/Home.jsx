import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';

const latestProductsPromise =fetch('http://localhost:3000/latestProducts').then(res=> res.json())

const Home = () => {
    return (
        <div className='bg-gray-100'>
            <LatestProducts latestProductsPromise={latestProductsPromise} > </LatestProducts>
        </div>
    );
};

export default Home;