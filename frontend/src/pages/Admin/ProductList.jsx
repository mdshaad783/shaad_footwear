import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice'
import {toast} from "react-toastify"
import {useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice'
import AdminMenu from './AdminMenu'


const ProductList = () => {
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)
    const [imageUrl, setImageUrl] = useState(null)
    
    const [sizesInput, setSizesInput] = useState('');
    const [sizes, setSizes] = useState([]);


    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation();
    const {data:categories} = useFetchCategoriesQuery()

    

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const sizeArray = sizesInput.split(',').map(s => s.trim()).filter(Boolean);



           const productData = new FormData() 
           productData.append('image', image)
           productData.append('name', name)
           productData.append('description', description)
           productData.append('price', price)
           productData.append('category', category)
           productData.append('quantity', quantity)
           productData.append('brand', brand)
           productData.append('countInStock', stock)
           productData.append('sizes', sizeArray)

           const data = await createProduct(productData).unwrap(); 
        //    console.log(data)

           if (data.error) {
            toast.error("Product create failed. Try Again.");
           } else {
            toast.success(`${data.name} is created`);
            navigate("/");
           }
        } catch (error) {
            console.error(error);
            toast.error("Product create failed. Try Again.");
        }
  };


    const uploadFileHandler = async(e)=>{
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            setImageUrl(res.image)
        } catch (error) {
            toast.error(error?.data?.message || error.error)            
        }
    }

  
    return (
    <div className='container xl:mx-[9rem] sm:mx-[0]'>
        <div className="flex flex-col items-center md:flex-row">
            <AdminMenu/>
            <div className="md:w-3/4 p-3">
                <div className="text-xl font-bold mb-4">Create Product</div>
                {imageUrl && (
                    <div className="text-center">
                        <img src={imageUrl} alt="product" className='block mx-auto max-h-[200px]' />
                    </div>
                )}
                <div className="mb-3">
                    <label className="border border-gray-300 text-gray-700 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                    {image? image.name : "Upload Image"}
                        <input type="file" name='image' accept='image/*' 
                        onChange={uploadFileHandler} 
                        className={!image? "hidden" : "text-white"}/>
                    </label>
                </div>
                <div>
                    <div className="flex flex-col flex-wrap items-center md:flex-row">
                        <div className="one">
                            <label htmlFor="name">Name</label><br />
                            <input type="text" className='p-4 mb-3 w-[30rem] border border-gray-300 rounded-lg text-gray-900' value={name} onChange={e=>setName(e.target.value)}/>
                        </div>
                        <div className="two ml-10">
                            <label htmlFor="name block">Price</label><br />
                            <input type="number" className='p-4 mb-3 w-[30rem] border border-gray-300 rounded-lg text-gray-900' value={price} onChange={e=>setPrice(e.target.value)}/>
                        </div>
                    </div>

                    <div className="flex flex-col items-center flex-wrap md:flex-row">
                        <div className="one">
                            <label htmlFor="name block">Quantity</label><br />
                            <input type="number" className='p-4 mb-3 w-[30rem] border border-gray-300 rounded-lg text-gray-900' value={quantity} onChange={e=>setQuantity(e.target.value)}/>
                        </div>
                        <div className="two ml-10">
                            <label htmlFor="name block">Brand</label><br />
                            <input type="text" className='p-4 mb-3 w-[30rem] border border-gray-300 rounded-lg text-gray-900' value={brand} onChange={e=>setBrand(e.target.value)}/>
                        </div>
                    </div>

                    <label htmlFor="" className='my-5'>Description</label>
                    <textarea type="text" className='p-2 mb-3 border border-gray-300 rounded-lg w-[95%] text-gray-900' value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>

                    <div className="flex flex-col items-center md:flex-row">
                        <div>
                            <label htmlFor="name block">Count In Stock</label> <br />
                            <input type="text" className='p-4 mb-3 w-[30rem] border border-gray-300 rounded-lg text-gray-900' value={stock} onChange={(e)=> setStock(e.target.value)}/>
                        </div>
                        <div className='ml-10'>
                            <label htmlFor="">Category</label> <br />
                            <select placeholder="Choose Category" className='p-4 mb-3 w-[30rem] border border-gray-300 rounded-lg text-gray-900' onChange={(e)=>setCategory(e.target.value)}>{categories?.map((c)=>(
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}</select>
                        </div>
                    </div>


                    {/* Size */}
                    <div className="one">
                            <label htmlFor="name">Size</label><br />
                            <input type="text" className='p-4 mb-3 w-[62.5rem] border border-gray-300 rounded-lg text-gray-900' placeholder="Enter sizes (e.g., S,M,L)" value={sizesInput} onChange={(e) => setSizesInput(e.target.value)}/>
                        </div>
                    <button onClick={handleSubmit} className='py-2 px-8 mt-5 rounded-lg text-lg font-bold bg-blue-500 text-white hover:bg-blue-600 ml-[50%] md:ml-0'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductList