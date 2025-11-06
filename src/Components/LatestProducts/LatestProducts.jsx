import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({latestProductsPromise}) => {
    const products = use(latestProductsPromise)

    return (
        <div>
            <h1 className='text-center font-bold text-[2.5rem] py-5'>All <span className='text-gradient'>Products</span></h1>
            <div className='grid md:grid-cols-3 gap-4 px-10'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product> )
                }
            </div>
        </div>
    );
};

export default LatestProducts;