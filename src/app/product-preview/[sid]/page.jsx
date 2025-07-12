'use client';

import React, { useEffect, useReducer, useRef, useState } from 'react';
import Header from '@/app/component/Header';
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/app/component/Footer';

function SubproductPage() {
  const { sid } = useParams();
  const textareaRef = useRef(null);

  const [productName, setProductName] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const reduxSubproducts = useSelector((state) => state.subproduct.subproduct || []);

  const [filterProduct, setFilterProduct] = useState(null);
  const [parsedPrices, setParsedPrices] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [total, setTotal] = useState(0);
  const [allProducts, setAllProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const initialState = {
    name: '',
    email: '',
    contact: '',
    remark: '',
  };

  const reducerForm = (state, action) => ({
    ...state,
    [action.type]: action.payload,
  });

  const [formState, dispatch] = useReducer(reducerForm, initialState);

  useEffect(() => {
    let subproduct = reduxSubproducts.find((sub) => sub.sid == sid);
    if (!subproduct) {
      const stored = localStorage.getItem('subproduct');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          subproduct = parsed.find((sub) => sub.sid == sid);
        } catch (err) {
          console.error('Invalid localStorage:', err);
        }
      }
    }
    if (subproduct) {
      setFilterProduct(subproduct);
    }
  }, [sid, reduxSubproducts]);

  

  useEffect(() => {
    const productData = localStorage.getItem('product');
    const parsed = productData ? JSON.parse(productData) : [];
    setAllProducts(parsed);
    if (!filterProduct) return;
    const matchedProduct = parsed.find((prod) => prod.pid == filterProduct.pid);
    setProductName(matchedProduct ? matchedProduct.pname : 'Product not found');
  }, [filterProduct]);

  useEffect(() => {
    if (filterProduct?.prices_select) {
      try {
        const parsed =
          typeof filterProduct.prices_select === 'string'
            ? JSON.parse(filterProduct.prices_select)
            : filterProduct.prices_select;
        setParsedPrices(parsed);
      } catch (err) {
        console.error('Invalid prices_select:', err);
        setParsedPrices({});
      }
    }
  }, [filterProduct]);

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  const calculateTotal = (qty, options) => {
    let basePrice = Number(filterProduct?.price || 0);
    for (const [key, val] of Object.entries(options)) {
      const optionPrice = parsedPrices[key]?.[val];
      if (optionPrice) basePrice += Number(optionPrice);
    }
    return qty * basePrice;
  };

  const handleQuantity = (e) => {
    const qty = Number(e.target.value);
    setQuantity(qty);
    setTotal(calculateTotal(qty, selectedOptions));
  };

  const handleOptionChange = (category, value) => {
    const newOptions = { ...selectedOptions, [category]: value };
    setSelectedOptions(newOptions);
    setTotal(calculateTotal(quantity, newOptions));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sid', filterProduct.sid);
    formData.append('sname', filterProduct.sname);
    formData.append('price', total || filterProduct.price);
    formData.append('quantity', quantity);
    formData.append('options', JSON.stringify(selectedOptions));
    formData.append('name', formState.name);
    formData.append('contact', formState.contact);
    formData.append('email', formState.email);
    formData.append('remark', formState.remark);

    uploadedFiles.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      const res = await axios.post('/api/order', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowFormModal(false);
          setShowSuccess(false);
        }, 2000);

        // Optionally clear form and files
        dispatch({ type: 'name', payload: '' });
        dispatch({ type: 'contact', payload: '' });
        dispatch({ type: 'email', payload: '' });
        dispatch({ type: 'remark', payload: '' });
        setUploadedFiles([]);
      } else {
        alert(res.data.message || 'Failed to submit');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred while submitting.');
    }
  };

  if (!filterProduct) {
    return (
      <div className="container">
        <Header />
        <p>Loading subproduct...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="mt-4">
          <ul className="flex p-2 gap-[5px] text-sm bg-[#c1c6ca] whitespace-nowrap md:gap-[12px] md:text-md md:whitespace-normal">
            <li className="capitalize">
              <Link href="/" className="!text-black">Home</Link>
            </li>
            <li>/</li>
            <li className="capitalize font-bold relative group cursor-pointer">
              <Link href={`/subproduct/${filterProduct.pid}`} className="!text-black">
                {productName}
              </Link>
              <ul className="absolute left-0 mt-1 bg-white border shadow-md rounded hidden group-hover:block z-50 w-max max-h-[200px] overflow-auto">
                {allProducts
                  .filter((p) => p.pid != filterProduct.pid)
                  .map((p) => (
                    <li key={p.pid} className="px-3 py-1 hover:bg-gray-100 capitalize">
                      <Link href={`/subproduct/${p.pid}`} className="!text-black block">
                        {p.pname}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>

            
            <li>/</li>
            <li className="font-bold capitalize">{filterProduct.sname}</li>
          </ul>
        </div>

        {showSuccess && (
          <div className="bg-green-500 text-white text-center p-2 my-4 rounded">
            🎉 Enquiry Submitted successfully!
          </div>
        )}

        <div className="row mt-3">
          <div className="col-sm-7">
            <Image
              src={`/image/subproduct/${filterProduct.simage}`}
              width={800}
              height={600}
              alt={filterProduct.sname}
              priority
              loading="eager"
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          </div>

          <div className="col-sm-5">
            <p className="font-bold text-[24px]">{filterProduct.sname}</p>
            <hr className="border-b-2 border-gray-500" />
            <p className="text-[14px] leading-[22px]">{filterProduct.sdesc}</p>

            <div>
              <label><b>Specification:</b></label>
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                className="form-control mb-2 resize-none min-h-[80px] max-h-[300px] overflow-hidden w-full p-2 rounded border border-gray-300"
                placeholder="Add specifications like size, paper, lamination..."
                rows={1}
              />
            </div>

            <div>
              <label><b>Quantity:</b></label>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantity}
                className="form-control !w-[50%] mt-1 mb-2"
                min={1}
              />
            </div>

            <hr />

            {uploadedFiles.length > 0 && (
              <>
                <div className="grid grid-cols-3 gap-2 mt-3 mb-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative border p-1 rounded">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          className="h-24 w-full object-cover rounded"
                        />
                      ) : (
                        <p className="text-sm text-center">{file.name}</p>
                      )}
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                        onClick={() => handleRemoveImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-left mb-3">
                  <button
                    className="text-black-600 underline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    + Upload More Design
                  </button>
                </div>
              </>
            )}

            {uploadedFiles.length === 0 && (
              <div
                className="!w-[50%] p-2 text-center justify-center border border-gray-400 mb-3 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image src={`/upload_update.svg`} alt="upload-image" width={200} height={100} />
                <p className="font-bold text-left mt-2">Upload a full design</p>
                <ul className="leading-[30px] text-left">
                  <li>✶ Have a complete design</li>
                  <li>✶ Have your own designer</li>
                </ul>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              accept="image/*,.pdf"
              multiple
            />

            <button
              className="bg-[#1f4b59] text-white p-2 mt-4"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowFormModal(true);
              }}
            >
              GET A QUOTE
            </button>
          </div>
        </div>
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500"
              onClick={() => setShowFormModal(false)}
            >
              &times;
            </button>
            <h2 className="text-center text-lg font-semibold mb-2">GET A QUOTE</h2>
            <p className="text-center">We will contact you shortly.</p>
            <hr />

            {showSuccess && (
              <div className="bg-green-100 text-green-800 border border-green-300 text-sm p-2 rounded my-3">
                ✅ Enquiry submitted successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {['name', 'contact', 'email', 'remark'].map((field) => (
                <div className="form-group mb-3" key={field}>
                  <label className="capitalize">{field}:</label>
                  {field === 'remark' ? (
                    <textarea
                      className="form-control"
                      name={field}
                      required
                      value={formState[field]}
                      onChange={(e) => dispatch({ type: field, payload: e.target.value })}
                    ></textarea>
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      className="form-control"
                      required
                      value={formState[field]}
                      onChange={(e) => dispatch({ type: field, payload: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="bg-[#1f4b59] text-white p-2 mt-2 w-full">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}

      <br />
      <Footer />
    </div>
  );
}

export default SubproductPage;
