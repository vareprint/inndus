'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Header from '@/app/component/Header';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/app/component/Footer';

function Subproduct() {
  const { pid } = useParams();
  const [productName, setProductName] = useState('');
  const [otherProducts, setOtherProducts] = useState([]);
  const reduxSubproducts = useSelector((state) => state.subproduct.subproduct);
  const [filteredSubproducts, setFilteredSubproducts] = useState([]);

  useEffect(() => {
    const productData = localStorage.getItem('product');
    const parsed = productData ? JSON.parse(productData) : [];

    // Find and set current product
    const matchedProduct = parsed.find((prod) => prod.pid == pid);
    const currentProductName = matchedProduct ? matchedProduct.pname : 'Product not found';
    setProductName(currentProductName);

    // Set other product names excluding current
    const others = parsed.filter((prod) => prod.pid != pid);
    setOtherProducts(others);
  }, [pid]);

  useEffect(() => {
    let sourceSubproducts = reduxSubproducts;

    if (!reduxSubproducts || reduxSubproducts.length === 0) {
      const localData = localStorage.getItem('subproduct');
      if (localData) {
        sourceSubproducts = JSON.parse(localData);
      }
    }

    const filtered = sourceSubproducts.filter((item) => item.pid == pid);
    setFilteredSubproducts(filtered);
    localStorage.setItem('filteredSubproducts', JSON.stringify(filtered));
  }, [reduxSubproducts, pid]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container">
          {/* Breadcrumb */}
          <div className="mt-4">
            <ul className="p-2 flex gap-[12px] bg-[#c1c6ca] whitespace-nowrap text-sm sm:text-base md:text-md relative">
              <li>
                <Link href="/" className="!text-black">Home</Link>
              </li>
              <li>/</li>
              {/* Hover Dropdown for Other Products */}
              <li className="relative group font-bold cursor-pointer">
                {productName}
                {otherProducts.length > 0 && (
                  <ul className="absolute left-0 mt-1 w-max bg-white border shadow-lg rounded hidden group-hover:block z-50">
                    {otherProducts.map((prod) => (
                      <li key={prod.pid} className="px-3 py-1 hover:bg-gray-100 capitalize">
                        <Link href={`/subproduct/${prod.pid}`} className="!text-black block">
                          {prod.pname}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Subproducts Grid */}
          <div className="row mt-4">
            {filteredSubproducts.length > 0 ? (
              filteredSubproducts.map((item, index) => (
                <div className="col-sm-3 mb-3" key={index}>
                  <div className="text-center">
                    <Link href={`/product-preview/${item.sid}`}>
                      <Image
                        src={`/image/subproduct/${item.simage}`}
                        width={350}
                        height={200}
                        alt={item.sname}
                        placeholder="blur"
                        blurDataURL="/image/placeholder.webp"
                        loading="lazy"
                        className="rounded-md object-cover transition duration-300 hover:scale-105"
                      />
                      <p className="mb-2 text-left text-black mt-2 capitalize">{item.sname}</p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full text-center justify-center text-gray-500 mt-4">
                No subproducts found.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Subproduct;
