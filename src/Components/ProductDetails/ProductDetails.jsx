import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router';
import { format } from 'date-fns';
import { AuthContext } from '../../Context/AuthProvider';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const ProductDetails = () => {
    const products = useLoaderData()
    const [bids, setBids] =useState([])
    const { _id: productId , title, price_min, price_max, email, category, created_at, image, status, location, seller_image, seller_name, condition, usage, description, seller_contact } = products;
    const formatted = format(new Date(created_at), "dd/MM/yyyy");
    const { user } = useContext(AuthContext)

    const bidModalRef = useRef(null)
    const handleBidModalOpen = ()=> {
        bidModalRef.current.showModal()
    }

    const handleBidSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const photo = e.target.photo.value
        const bid = e.target.bid.value
        const contact = e.target.number.value

        const newBid = {
            // title: title,
            product: productId,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            buyer_image: photo,
            buyer_contact: contact,
            status: 'pending'
        }

            fetch('http://localhost:3000/bids', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(newBid)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    bidModalRef.current.close()
                    MySwal.fire({
                        icon: "success",
                        title: "Your bid has been placed successfully!",
                    })

                    //add the new bid to the state
                    newBid._id = data.insertedId
                    const newBids = [...bids, newBid]
                    newBids.sort((a,b)=> b.bid_price - a.bid_price)
                    setBids(newBids)
                }
                
            })
    }

    //Bids & Token related APIs
    useEffect(()=> {
        fetch(`http://localhost:3000/products/bids/${productId}`, {
            headers: {
                authorization : `Bearer ${user.accessToken}` 
            }
        })
            .then(res => res.json())
            .then(data => {
                setBids(data)
            })
    }, [productId, user])

    return (
        <div className='p-10 bg-gray-100'>
            {/* Details */}
            <div className='grid md:grid-cols-5 gap-4 h-full items-stretch '>
                <div className='md:col-span-2 h-full '>
                    <div className='flex items-center justify-center mb-2'><img className='rounded-[0.51rem] mb-3 w-full h-[14.1rem] object-cover' src={image} alt="" /></div>
                    <div className='flex flex-col space-y-3 bg-white p-4 rounded-[0.51rem]'>
                        <h3 className='text-[1.4rem] font-semibold'>Product Description</h3>
                        <div className='flex justify-between items-center border-b-2 pb-3'>
                            <div className='text-gradient font-semibold'>Condition: <span className='text-black'>{condition}</span> </div>
                            <div className='text-gradient font-semibold'>Usage Time : <span className='text-black'>{usage}</span> </div>
                        </div>
                        <div className='grow h-full text-gray-500 font-medium text-[0.85rem]'>{description}</div>
                    </div>
                </div>

                <div className='md:col-span-3 h-full space-y-4'>
                    <Link to='/' className=' badge badge-primary badge-outline flex items-center gap-2'> <FaArrowLeftLong /> Back to Products</Link>
                    <h2 className='text-[2rem] font-bold'>{title}</h2>
                    <div className='rounded-[0.9rem] w-fit px-4  bg-purple-200'> <span className='text-gradient font-medium'>{category}</span> </div>
                    <div className='bg-white rounded-[0.6rem] p-4'>
                        <p className='text-[#4CAF8B] text-[1.3rem] font-medium'>$ {price_min} - {price_max} </p>
                        <p>Price starts from </p>
                    </div>

                    <div className='bg-white rounded-[0.6rem] p-4'>
                        <h3 className='text-[1.4rem] font-bold'>Product Details</h3>
                        <p className='font-medium'>Product ID: <span className='font-normal'> {productId} </span> </p>
                        <p className='font-medium'>Posted: <span className='font-normal'>{formatted}</span> </p>
                    </div>

                    <div className='bg-white rounded-[0.6rem] p-4 space-y-1'>
                        <h3 className='text-[1.4rem] font-bold'>Seller Information</h3>
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="avatar"> <div className="mask mask-squircle h-12 w-12"> <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" /> </div></div>
                                <div>
                                    <div className="font-bold">{seller_name}</div>
                                    <div className="text-sm opacity-50">{email}</div>
                                </div>
                            </div>
                        </div>
                        <p className='font-medium'>Location: <span className='font-normal'> {location} </span> </p>
                        <p className='font-medium'>Contact: <span className='font-normal'>{seller_contact}</span> </p>
                        <div className='font-medium flex items-center gap-2'>Status: <div className="badge badge-soft badge-primary"> {status} </div> </div>
                        <button onClick={handleBidModalOpen} type="submit" className="btn-primary-w-full mt-2" >I want Buy This Product</button>
                    </div>
                </div>
            </div>

            {/* Bids */}
            <div>
                <h2 className='text-[1.5rem] font-bold mt-6 mb-4 '> Bids For This Products: {bids.length} </h2>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SL No</th>
                                <th>Product</th>
                                <th>Seller</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bids.map((bid, index) =>   
                            <tr key={index}>
                                <th> {index + 1} </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar"> <div className="mask mask-squircle h-12 w-12"> <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" /> </div> </div>
                                        <div>
                                            <div className="font-bold">{title}</div>
                                            <div className="text-sm opacity-50">$ {price_min} - {price_max}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar"> <div className="mask mask-squircle h-12 w-12"> <img src={bid?.buyer_image || "https://i.ibb.co.com/0yFv71Xh/puzzled-displeased-man-with-stubble-grows-house-plants-needs-wipe-dust-sansevieria-273609-27490.jpg"} alt={bid?.buyer_name || "User"} /> </div> </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-50">{bid.buyer_email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${bid.bid_price}</td>
                                <th className='flex items-center gap-2'> 
                                    <div className="badge btn badge-outline badge-success">Accept Offer</div> 
                                    <div className="badge btn badge-outline badge-error">Reject offer</div>
                                </th>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle ">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-[1.5rem] text-center">Give Seller Your Offered Price</h3>

                    <div className="card w-full mt-4">
                        <form onSubmit={handleBidSubmit} className="fieldset w-full">
                            <div className='flex items-center justify-between gap-8'>
                                <div className='space-y-1'>
                                    <label className="label">Buyer Name</label>
                                    <input name='name' defaultValue={user?.displayName} readOnly type="text" className="input" placeholder="Your name" />
                                </div>
                                <div className='space-y-1'>
                                    <label className="label">Buyer Email</label>
                                    <input name='email' defaultValue={user?.email} readOnly type="email" className="input" placeholder="Your  Email" />
                                </div>
                            </div>

                            <label className="label mt-[0.3rem] -mb-1">Buyer Image URL</label>
                            <input name='photo' defaultValue={user?.photoURL} type="url" className="input w-full" placeholder="https://...your_img_url" />

                            <label className="label mt-[0.3rem] -mb-1">Place your Price</label>
                            <input name='bid' type="number" className="input w-full" placeholder="e.g. 1200" />

                            <label className="label mt-[0.3rem] -mb-1">Contact Info</label>
                            <input name='number' type="number" className="input w-full" placeholder="e.g. +1-555-1234" />
                            <button className="btn-primary-w-full mt-3">Submit Bid</button>
                        </form>
                    </div>

                    <div className="modal-action"><form method="dialog"> 
                        {/* <button className="btn">Close</button>  */}
                        {/* <div className="flex items-center gap-3"> */}
                            <button     className="btn-secondary-w-full w-full">Cancel</button>
                            {/* <Link  className="btn-primary">Submit Bid</Link> */}
                        {/* </div> */}
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default ProductDetails;