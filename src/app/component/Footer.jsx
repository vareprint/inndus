"use client";
import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
   
      <div className="bg-[#1f4b59] text-white">
    <div className='container sm:block md:flex justify-center gap-[50%]  pt-4'>
        <div>
           <p className='font-bold'> PRODUCTS</p> 
           <ul className='leading-[32px] text-sm'>

         
            <li>
              <Link href="/subproduct/1" className="text-white hover:underline">
                BUSINESS STATIONERY
              </Link>
            </li>
            <li>
              <Link href="/subproduct/5" className="text-white hover:underline">
                MARKETING & PROMOTIONAL
              </Link>
            </li>
            <li>
              <Link href="/subproduct/4" className="text-white hover:underline">
                GIFTS & MERCHANDISE
              </Link>
            </li>
            <li>
              <Link href="/subproduct/2" className="text-white hover:underline">
                DECOR
              </Link>
            </li>
            <li>
              <Link href="/subproduct/6" className="text-white hover:underline">
                PACKAGING & LABELS
              </Link>
            </li>
            <li>
              <Link href="/subproduct/3" className="text-white hover:underline">
                EDUCATIONAL & PUBLISHING
              </Link>
            </li>
         


           

           </ul>
        </div>

        


        <div>
           <p className='font-bold'> CONTACT</p> 
           <ul className='leading-[32px] text-sm'>
            <li>B-14, Durian Estate</li>
            <li>Goregaon Mulund Link Road</li>
            <li>Goregaon East, Mumbai 400063</li>
            <li>022-40968900 | print@inndus.com</li>
           </ul>
        </div>
   
   
    </div>
   </div>
  )
}

export default Footer