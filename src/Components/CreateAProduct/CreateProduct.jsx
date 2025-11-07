import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateProduct = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const handleCreateProduct = (e)=>{
    e.preventDefault()
    const title = e.target.title.value
    const category = e.target.category.value
    const price_min = e.target.minPrice.value
    const price_max = e.target.maxPrice.value
    const condition = e.target.condition.value
    const usage = e.target.usage.value
    const image = e.target.photoURL.value
    const seller_contact = e.target.sellerContact.value
    const location = e.target.location.value
    const description = e.target.description.value

    const created_at = new Date().toISOString();
    const status = "pending"

    const seller_name = e.target.sellerName.value || user.displayName;
    const email = e.target.sellerEmail.value || user.email;
    const seller_image = e.target.sellerPhoto.value || user.photoURL;

    const newProducts = { title, category, price_min, price_max, condition, usage, image, seller_contact, location, description,created_at, status, seller_name, email, seller_image }

      // axios.post('https://smart-deals-api-server-weld.vercel.app/products', newProducts)
      //   .then(data => {
      //     console.log(data.data);
          // if(data.data.insertedId){
          //   Swal.fire({
          //       icon: "success",
          //       title: "Your products has been created successfully!",
          //   })
          // }
      // })

      axiosSecure.post('/products', newProducts)
        .then(data => {
          console.log('after secure call' ,data.data);
          // if(data.data.insertedId){
          //   Swal.fire({
          //       icon: "success",
          //       title: "Your products has been created successfully!",
          //   })
          // }
        })
  }

    return (
        <div>
            <div className='py-5'>
                <div className='flex justify-center'><Link to='/' className='block badge badge-primary badge-outline flex items-center gap-2'> <FaArrowLeftLong /> Back to Products</Link></div>
                <h1 className='text-center font-bold text-[2.5rem]'>Create a <span className='text-gradient'>Products</span></h1>

                  <div className="card w-full mt-4 p-6 bg-base-100 shadow-xl rounded-lg max-w-lg mx-auto">
                    <form onSubmit={handleCreateProduct} className="fieldset w-full">
                      <div className='flex items-center justify-between gap-4'>
                        <div className='space-y-1 w-full md:w-1/2'>
                            <label className="label">Title</label>
                            <input name="title" type="text" className="input" placeholder="Product title" />
                        </div>

                        <div className='space-y-1 w-full md:w-1/2'>
                            <label className="label">Category</label>
                              <select name="category" className="select select-neutral">
                                <option disabled={true}>Select a Category</option>
                                <option>Electronics</option>
                                <option>Furniture</option>
                                <option>Home Appliance</option>
                                <option>Vehicles</option>
                                {/* <option>Plants</option> */}
                              </select>
                        </div>
                      </div>

                      <div className='flex items-center justify-between gap-4'>
                          <div className='space-y-1 w-full md:w-1/2'>
                              <label className="label">Min Price You want to Sale ($)</label>
                              <input name="minPrice" type="number" className="input" placeholder="Min Price" />
                          </div>
                          <div className='space-y-1 w-full md:w-1/2'>
                              <label className="label">Max Price You want to Sale ($)</label>
                              <input name="maxPrice" type="number" className="input" placeholder="Max Price" />
                          </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="w-full md:w-1/2">
                          <label className="label text-sm font-medium text-gray-700 mb-1">Product Condition</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="radio" name="condition" value="Brand New" className="radio radio-xs radio-primary" defaultChecked /> Brand New
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="radio" name="condition" value="Used" className="radio radio-xs radio-primary" /> Used
                            </label>
                          </div>
                        </div>

                        <div className="w-full md:w-1/2">
                          <label className="label mt-[0.3rem] mb-[0.3rem]">Product Usage time</label>
                          <input name="usage" type="text" className="input w-full" placeholder="e.g. Used for 1 year 3 months"/>
                        </div>
                      </div>

                      <label className="label mt-[0.3rem] -mb-1">Your Product Image URL</label>
                      <input name="photoURL" type="url" className="input w-full" placeholder="https://..." />

                      <div className='flex items-center justify-between gap-4'>
                        <div className='space-y-1 w-full md:w-1/2'>
                          <label className="label  ">Seller Name</label>
                          <input name="sellerName" defaultValue={user?.displayName} type="text" className="input input-bordered w-full" placeholder="Seller Name" />
                        </div>
                        <div className='space-y-1 w-full md:w-1/2'>
                          <label className="label  ">Seller Email</label>
                          <input name="sellerEmail" defaultValue={user?.email} readOnly type="email" className="input input-bordered w-full" placeholder="Seller Email" />
                        </div>
                      </div>

                      <div className='flex items-center justify-between gap-4'>
                        <div className='space-y-1 w-full md:w-1/2'>
                          <label className="label ">Seller Contact</label>
                          <input name="sellerContact" type="text" className="input input-bordered w-full" placeholder="e.g. +8801712345678" />
                        </div>
                        <div className='space-y-1 w-full md:w-1/2'>
                          <label className="label ">Seller Image URL</label>
                          <input name="sellerPhoto" defaultValue={user?.photoURL} type="url" className="input input-bordered w-full" placeholder="https://..." />
                        </div>
                      </div>

                      <label className="label mt-[0.3rem] mb-[0.01rem]">Location</label>
                      <input name="location" type="text" className="input w-full" placeholder="e.g. Dhaka, Bangladesh" />

                      <label className="label mt-[0.3rem] mb-[0.01rem]">Simple Description about your Product</label>
                      <textarea name="description" className="textarea w-full" rows="3" placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough......" />

                      <button className="btn-primary-w-full mt-3">Create A Product</button>
                    </form>
                  </div>

            </div>
        </div>
    );
};

export default CreateProduct;