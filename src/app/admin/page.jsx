"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation"; // <- next's router


function Admin() {
  const router = useRouter();
  const [user, setUser]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(user=='Admin' && password=="123"){
      localStorage.setItem("AdminUser", user);
      router.push('/admin/product');
    }else{
      setError("Something went wrong")
    }
  }
  return (
   <>
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
    {error && 
    (
      <p className='text-red-500'>{error}</p>
    )}
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block mb-2 font-medium">UserName</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
       onChange={(e)=>setUser(e.target.value)}
      />
    </div>


    <div className="mb-4">
      <label className="block mb-2 font-medium">Password</label>
      <input
        type="password"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e)=>setPassword(e.target.value)}
      />
    </div>


    <div className="mb-4">
     <button name='submit' className='btn-success p-2'>SUBMIT</button>
    </div>


    </form>
  </div>
</div>
   </>
  )
}

export default Admin