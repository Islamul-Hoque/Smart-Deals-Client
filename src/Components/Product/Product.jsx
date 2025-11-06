import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {
    const {_id,  image , status, title, condition, price_max, price_min} = product
    
    return (
        <div className=' shadow p-4 rounded-[0.8rem]'>
            <div className='flex items-center justify-center'><img className='rounded-[0.7rem] mb-3 w-full h-[14.1rem] object-cover' src={image} alt="" /></div>
            <div className='rounded-[0.9rem] w-fit px-5 bg-purple-200'> <span className='text-gradient font-medium'>{condition}</span> </div>
            <h3 className='text-[1.4rem] font-semibold'>{title}</h3>
            <p className='text-gradient my-2 text-[1.1rem] font-medium'>$ {price_min} - {price_max} </p>
            <Link to={`/productDetails/${_id}`} className='btn-secondary-w-full '>View Details</Link>
        </div>
    );
};

export default Product;