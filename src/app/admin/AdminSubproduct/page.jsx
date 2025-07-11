'use client';

import { useState } from 'react';

export default function AddSubProduct() {
  const [formData, setFormData] = useState({
    pid: '',
    pname: '',
    pdesc: '',
    min_qty: '',
    price: '',
    pimage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'pimage') {
      const file = files[0];
      setFormData({ ...formData, pimage: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('pid', formData.pid);
    body.append('pname', formData.pname);
    body.append('pdesc', formData.pdesc);
    body.append('min_qty', formData.min_qty);
    body.append('price', formData.price);
    if (formData.pimage) {
      body.append('pimage', formData.pimage);
    }

    try {
      const res = await fetch('/api/your-api-route', {
        method: 'POST',
        body,
      });

      const data = await res.json();
      if (res.ok) {
        alert('Sub Product added successfully with ID: ' + data.id);
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Add Sub Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">


      <div>
          <label className="form-label">Select Category</label>
         <select className='form-control'>
            {/* <option value={}></option> */}

         </select>
        </div>
        
        <div>
          <label className="form-label">Sub Product Name</label>
          <input
            name="pname"
            type="text"
            className="form-control"
            placeholder="Enter product name"
            value={formData.pname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="form-label">Description</label>
          <textarea
            name="pdesc"
            className="form-control"
            placeholder="Enter product description"
            value={formData.pdesc}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Minimum Quantity</label>
            <input
              name="min_qty"
              type="number"
              className="form-control"
              placeholder="0"
              value={formData.min_qty}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Price</label>
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="form-label">Product Image</label>
          <input
            name="pimage"
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover border rounded"
            />
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
