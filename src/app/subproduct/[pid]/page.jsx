'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Header from '@/app/component/Header';
import Footer from '@/app/component/Footer';
import Link from 'next/link';
import Image from 'next/image';

function Subproduct() {
  const { pid } = useParams();
  const [productName, setProductName] = useState('');
  const [otherProducts, setOtherProducts] = useState([]);
  const [filteredSubproducts, setFilteredSubproducts] = useState([]);
  const reduxSubproducts = useSelector((state) => state.subproduct.subproduct);

  // Load current product name and other product links
  useEffect(() => {
    const productData = localStorage.getItem('product');
    const products = productData ? JSON.parse(productData) : [];

    const current = products.find((prod) => prod.pid == pid);
    setProductName(current ? current.pname : 'Product Not Found');

    const others = products.filter((prod) => prod.pid != pid);
    setOtherProducts(others);
  }, [pid]);

  // Filter subproducts by pid and sort by seq
  useEffect(() => {
    let subproducts = reduxSubproducts;

    if (!reduxSubproducts || reduxSubproducts.length === 0) {
      const localSub = localStorage.getItem('subproduct');
      if (localSub) subproducts = JSON.parse(localSub);
    }

    const filtered = subproducts
      .filter((item) => item.pid == pid)
      .sort((a, b) => a.seq - b.seq);

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
            <ul className="p-2 flex gap-3 bg-[#c1c6ca] text-sm md:text-base relative">
              <li><Link href="/" className="!text-black">Home</Link></li>
              <li>/</li>
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
                <div className="col-sm-3 mb-4" key={index}>
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
                      <p className="mt-2 mb-2 text-left text-black capitalize">{item.sname}</p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-gray-500 mt-4">
                No subproducts found.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Subproduct;
