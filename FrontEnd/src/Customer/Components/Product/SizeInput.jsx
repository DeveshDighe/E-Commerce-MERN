import React, { useState } from 'react';

function SizeInput({ onChange }) {
  const [sizes, setSizes] = useState([{ name: '', quantity: '' }]);

  const handleNameChange = (index, e) => {
    const { value } = e.target;
    const updatedSizes = [...sizes];
    updatedSizes[index].name = value.toUpperCase();
    setSizes(updatedSizes);
    onChange(updatedSizes);
  };

  const handleQuantityChange = (index, e) => {
    const { value } = e.target;
    const updatedSizes = [...sizes];
    updatedSizes[index].quantity = value;
    setSizes(updatedSizes);
    onChange(updatedSizes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { name: '', quantity: '' }]);
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
    onChange(updatedSizes);
  };

  return (
    <div className='flex flex-col gap-4 mt-2'>
      {sizes.map((size, index) => (
        <div key={index} className='flex justify-between items-center gap-3'>
          <input
            type="text"
            name="name"
            placeholder="Size"
            value={size.name.toUpperCase()}
            onChange={(e) => handleNameChange(index, e)}
            className='border border-gray-300 w-full rounded-sm mt-2 h-8 px-3'
            required={sizes.length <= 0}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={size.quantity}
            onChange={(e) => handleQuantityChange(index, e)}
            className='border border-gray-300 w-full rounded-sm mt-2 h-8 px-3'
            required={sizes.length <= 0}
          />
          {sizes.length > 1 && (
            <button className='border h-full py-1 px-3 hover:bg-slate-100' type="button" onClick={() => handleRemoveSize(index)}>Remove</button>
          )}
        </div>
      ))}
      <button type="button" className='border px-4 py-1 rounded-sm mt-4 hover:bg-slate-100' onClick={handleAddSize}>Add Size</button>
    </div>
  );
}

export default SizeInput;
