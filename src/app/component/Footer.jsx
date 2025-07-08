"use client";
import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
   <div className='bg-[#1f4b59] text-white'>
    <div className='container sm:block md:flex text-center gap-[21%] pt-4'>
        <div>
           <p className='font-bold'> PRODUCTS</p> 
           <ul className='leading-[32px] text-sm'>
            <li><Link className='!text-white' href={'subproduct/1'}>BUSINESS STATIONERY</Link></li>
            <li><Link className='!text-white' href={'subproduct/2'}>DECOR</Link></li>
            <li><Link className='!text-white' href={'subproduct/3'}>EDUCATIONAL & PUBLISHING</Link></li>
            <li><Link className='!text-white' href={'subproduct/4'}>GIFTS & MERCHANDISE</Link></li>
           </ul>
        </div>

        <div>
        <p> </p> 
           <ul className='leading-[32px] text-sm'>
            <li><Link className='!text-white' href={'subproduct/5'}>MARKETING & PROMOTIONAL</Link></li>
            <li><Link className='!text-white' href={'subproduct/6'}>PACKAGING & LABELS</Link></li>
            
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