import React, { useState } from 'react';
import SizeInput from './SizeInput'; // Import the SizeInput component
import { api } from '../../../config/apiConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProductForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        imageUrl: '',
        brand: '',
        title: '',
        color: '',
        discountedPrice: 0,
        price: 0,
        discountPersent: 0,
        // size: [
        //     { name: '', quantity: 0 },
        //     { name: '', quantity: 0 },
        //     { name: '', quantity: 0 }
        // ],
        quantity: 0,
        topLavelCategory: '',
        secondLavelCategory: '',
        thirdLavelCategory: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSizeChange = (sizes) => {
        setFormData({
            ...formData,
            size: sizes
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.discountPersent>=99) {
            return toast.error('DiscountPercent is too high')
        }
        api.post('/api/admin/products/', formData)
        toast.success('Product uploaded')
        navigate('/')
    };

    return (
        <div className="border my-24 mx-auto w-3/4 md:w-[47rem] max-sm:w-4/5 px-6 py-10">
            <h1 className=' text-center text-xl'>Add New Product</h1>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-4' >
                <div>
                    <label htmlFor="imageUrl" className=' text-[1.1rem] text-gray-700 '>Image URL:</label>
                    <input required type="text" id="imageUrl" name="imageUrl" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.imageUrl} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="brand" className=' text-[1.1rem] text-gray-700' >Brand:</label>
                    <input required type="text" id="brand" name="brand" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.brand} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="title" className=' text-[1.1rem] text-gray-700'>Title:</label>
                    <input required type="text" id="title" name="title" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="color" className=' text-[1.1rem] text-gray-700'>Color:</label>
                    <input required type="text" id="color" name="color" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.color} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="discountedPrice" className=' text-[1.1rem] text-gray-700'>Discounted Price:</label>
                    <input required type="number" id="discountedPrice" name="discountedPrice" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.discountedPrice} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="price" className=' text-[1.1rem] text-gray-700'>Price:</label>
                    <input required type="number" id="price" name="price" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.price} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="discountPersent" className=' text-[1.1rem] text-gray-700'>Discount Percent:</label>
                    <input required type="number" id="discountPersent" name="discountPersent" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.discountPersent} onChange={handleChange} />
                </div>
                <div>
                    <label className=' text-[1.1rem] text-gray-700'>Size:</label>
                    <SizeInput sizes={formData.size} onChange={handleSizeChange} />
                </div>
                <div>
                    <label htmlFor="quantity" className=' text-[1.1rem] text-gray-700'>Quantity:</label>
                    <input required type="number" id="quantity" name="quantity" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.quantity} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="topLevelCategory" className=' text-[1.1rem] text-gray-700'>Top Level Category:</label>
                    <input required type="text" id="topLavelCategory" name="topLavelCategory" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.topLavelCategory} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="secondLevelCategory" className=' text-[1.1rem] text-gray-700'>Second Level Category:</label>
                    <input required type="text" id="secondLavelCategory" name="secondLavelCategory" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.secondLavelCategory} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="thirdLevelCategory" className=' text-[1.1rem] text-gray-700'>Third Level Category:</label>
                    <input required type="text" id="thirdLavelCategory" name="thirdLavelCategory" className=' border border-gray-300 w-full rounded-sm mt-2 h-8 px-3' value={formData.thirdLavelCategory} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description" className=' text-[1.1rem] text-gray-700'>Description:</label>
                    <textarea id="description" name="description" className=' border border-gray-500 w-full rounded-sm mt-2 h-20 px-3 py-1' value={formData.description} onChange={handleChange} />
                </div>
                <button type="submit" className=' border px-4 py-1 rounded-sm mt-4 hover:bg-slate-100'>Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;
