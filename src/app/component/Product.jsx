'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../redux/productSlice';
import { fetchSubproduct } from '../redux/subProductSlice';

function Product() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [subproducts, setSubproducts] = useState([]);
  const [expanded, setExpanded] = useState({});

  const visibleCount = 5; // number of subproducts shown initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/product');
        const productData = res.data.products;
        const subProductData = res.data.subproducts;

        setProducts(productData);
        setSubproducts(subProductData);

        dispatch(fetchProduct(productData));
        dispatch(fetchSubproduct(subProductData));
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const toggleView = (pid) => {
    setExpanded((prev) => ({
      ...prev,
      [pid]: !prev[pid],
    }));
  };

  // Group subproducts under each product
  const getSubproductsByProduct = (pid) =>
    subproducts.filter((sub) => String(sub.pid) === String(pid));

  return (
    <div className="container text-center">
      <p className="font-bold text-[20px] underline mt-1">THINGS WE DO</p>
      <div className="row text-center justify-center">
        {products.map((item, index) => {
          const relatedSubs = getSubproductsByProduct(item.pid);
          const isExpanded = expanded[item.pid] || false;
          const displayedSubs = isExpanded ? relatedSubs : relatedSubs.slice(0, visibleCount);

          return (
            <div className="col-sm-4" key={index}>
              <div className="grid justify-center p-3">
                <Link href={`/subproduct/${item.pid}`}>
                  <Image
                    src={`/image/${item.pimage}`}
                    alt={item.pname}
                    width={300}
                    height={100}
                  />
                  <p className="p-2 text-base text-black font-bold uppercase">{item.pname}</p>
                </Link>
              </div>

              {/* Subproduct Links */}
              <div className="text-sm text-gray-700 px-2 leading-[26px] -mt-[25px]">
                {displayedSubs.map((sub, i) => (
                  <span key={i}>
                    <Link
                      href={`/product-preview/${sub.sid}`}
                      className="!text-black hover:underline"
                    >
                      {sub.sname}
                    </Link>
                    {i < displayedSubs.length - 1 && ' | '}
                  </span>
                ))}

                {relatedSubs.length > visibleCount && (
                  <div className="mt-1">
                    <button
                      className="text-blue-600 text-xs hover:underline focus:outline-none"
                      onClick={() => toggleView(item.pid)}
                    >
                      {isExpanded ? 'View Less' : 'View More'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
