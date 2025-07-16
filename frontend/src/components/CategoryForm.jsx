import React from 'react'

const CategoryForm = ({ value, setValue, handleSubmit, buttonText = "Submit", handleDelete }) => {
  return (
    <div className='w-full max-w-xl px-4 sm:px-6 lg:px-4'>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <input type="text" className='py-3 px-4 border rounded-lg w-full' placeholder='Write category name' value={value} onChange={(e) => setValue(e.target.value)}/>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {buttonText}
          </button>
          {handleDelete && (
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
