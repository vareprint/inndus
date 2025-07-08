"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

function Faviourite() {
  const [flavour, setFlavour] = useState([]);
  const [favourite, setFavourite] = useState([]);

  const reduxSubproducts = useSelector((state) => state.subproduct.subproduct);

  // ✅ Filter and set once reduxSubproducts are available
  useEffect(() => {
    if (reduxSubproducts?.length) {
      const filterProduct1 = reduxSubproducts.filter((prod) => prod.offer == 1);
      const filterProduct2 = reduxSubproducts.filter((prod) => prod.offer == 2);

      setFlavour(filterProduct1);
      setFavourite(filterProduct2);
    }
  }, [reduxSubproducts]);

  return (
    <>
     <div className='bg-[#fdfff0] p-4 mt-2'>

<div className='container text-center'>
        <p className='leading-[25px]'>
          The best printed materials depend on your goals, whether it's marketing,
          branding, or personal use. They offer a wide range of uses and are highly
          effective in creating a strong visual presence, promoting products, and
          enhancing brand identity. Moreover, at Inndus, we understand the importance
          of deadlines. That's why we're committed to delivering your projects on
          time, every time, without compromising on quality.
        </p>
        
        <p className='mb-4 font-bold'>FLAVOUR OF THE MONTH</p>
      <div className='row mt-2'> 
          {flavour.map((item, index) => (

<div className='col-sm-3' key={index}>
<Link href={`/product-preview/${item.sid}`}>
  <div className="bg-white p-2 rounded-md transition-transform duration-300 transform hover:scale-105 shadow hover:shadow-lg mb-[20px]">
    <Image
      src={`/image/subproduct/${item.simage}`}
      width={200}
      height={100}
      alt={item.sname}
      className="w-full h-auto"
    />
    <p className='w-[79%] text-left text-black mt-2'>{item.sname}</p>
  </div>
</Link>
</div>

          
          ))}
       </div>
       </div>
       </div>


       <div className='p-4 mt-2'>
       <div className='containter'>
        
        <div className='container text-center'>
         
         <p className='mb-4 font-bold'>ALL-TIME FAVOURITES</p>
     
 <p className='leading-[25px] mb-4'>
 From business cards that make a lasting impression to vibrant posters that captivate audiences, we offer a comprehensive range of printing services tailored to meet your needs. Our state-of-the-art equipment and skilled team ensure that every project is executed with passion and professionalism.


 </p>
       
       <div className='row mt-2'> 
           {favourite.map((item, index) => (
 
 <div className='col-sm-3' key={index}>
 <Link href={`/product-preview/${item.sid}`}>
   <div className="bg-white p-2 rounded-md transition-transform duration-300 transform hover:scale-105 shadow hover:shadow-lg mb-[20px]">
     <Image
       src={`/image/subproduct/${item.simage}`}
       width={200}
       height={100}
       alt={item.sname}
       className="w-full h-auto"
     />
     <p className='w-[79%] text-left text-black mt-2'>{item.sname}</p>
   </div>
 </Link>
</div>

           
           ))}
        </div>
        <p className='leading-[25px] mt-5'>Whether you're a small business looking to make a big impact or a large corporation seeking top-notch printing solutions, or even an individual looking for personal or customised gifts, we've got you covered. Let us be your partner in print, turning your ideas into reality and trust us to make a lasting impression with every print.</p>
        <p className='text-center'>Welcome to Inndus, where we are passionate about printing.</p>
        </div>
        
        </div>
        
        </div>

        <br />
        
    </>
   

  );
}

export default Faviourite;
