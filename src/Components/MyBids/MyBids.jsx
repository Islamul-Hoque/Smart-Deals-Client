import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';

const MyBids = () => {
    const {user} = useContext(AuthContext)
    const [bids, setBids] = useState([])

    useEffect(()=> {
        if(user?.email){
            fetch(`http://localhost:3000/bids?email=${user.email}`, {
                headers: {
                    // Step-3: Token send to localStorage
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBids(data)
                })
        }
    }, [user])

    // useEffect(()=> {
    //     if(user?.email){
    //         fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${user.accessToken}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 setBids(data)
    //             })
    //     }
    // }, [user])



    const handleDeleteBid = (_id)=> {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                fetch(`http://localhost:3000/bids/${ _id }`,{
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.deletedCount){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                        }
                        //Remaining bids
                        const remainingBids = bids.filter(bid => bid._id !== _id)
                        setBids(remainingBids)
                    })
            }
        });
    }
    return (
        <div className='px-10'>
            <h2 className='font-bold text-[2rem] text-center my-10'>My Bids: <span className='text-gradient'>{bids.length}</span> </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bids.map((bid, index) =>   
                        <tr key={bid._id}>
                            <th> {index + 1} </th>

                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar"> <div className="mask mask-squircle h-12 w-12"> <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" /> </div> </div>
                                    <div>
                                        <div className="font-bold">{bid.title}</div>
                                        <div className="text-sm opacity-50">$ {bid.price_min} - {bid.price_max}</div>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar"> <div className="mask mask-squircle h-12 w-12"> <img src={bid.buyer_image} alt={bid.buyer_name} /> </div> </div>
                                    <div>
                                        <div className="font-bold">{bid.buyer_name}</div>
                                        <div className="text-sm opacity-50">{bid.buyer_email}</div>
                                    </div>
                                </div>
                            </td>

                            <td>${bid.bid_price}</td>
                            <td> <div className="badge btn badge-warning">Accept Offer</div> </td>
                            <td> <button onClick={()=> handleDeleteBid(bid._id)} className="badge btn badge-outline badge-error">Remove Bid</button> </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default MyBids;