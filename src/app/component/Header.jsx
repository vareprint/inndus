"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const [search, setSearch] = useState('');

  const reduxSubproducts = useSelector((state) => state.subproduct.subproduct);

  const searchList = useMemo(() => {
    return reduxSubproducts?.filter((item) =>
      item.sname?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, reduxSubproducts]);

  return (
    <div className="w-full bg-[#1f4b59] p-2">
      {/* Container for logo and search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 relative">
        {/* 🔗 Logo (Left side) */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/image/INNDUS LOGO-white.webp"
              width={100}
              height={100}
              alt="logo"
              className="h-auto w-[100px]"
            />
          </Link>
        </div>

        <div className="w-full sm:w-[50%] relative flex justify-end">
  <div className="w-full sm:w-[300px] text-right">
    <input
      type="text"
      className="w-full h-[30px] px-3 py-2 !text-white rounded outline-none border border-gray-300 text-center"
      placeholder="Search Product"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* 🔍 Search results */}
    {search && searchList?.length > 0 && (
      <ul className="absolute right-0 top-full mt-2 bg-white text-black w-full sm:w-[300px] max-h-[200px] overflow-y-auto shadow-md z-10">
        {searchList.map((item) => (
          <li key={item.sid} className="p-2 hover:bg-gray-100 text-left">
            <Link className="!text-black block" href={`/product-preview/${item.sid}`}>
              {item.sname}
            </Link>
          </li>
        ))}
      </ul>
    )}

    {/* No results (optional) */}
    {search && searchList?.length === 0 && (
      <ul className="absolute right-0 top-full mt-2 bg-white text-black w-full sm:w-[300px] shadow-md z-10">
        <li className="p-2 text-left">No results found</li>
      </ul>
    )}
  </div>
</div>

      </div>
    </div>
  );
}

export default Header;
