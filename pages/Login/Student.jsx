import React, { useState, useEffect } from 'react';
import logo from './logo.png'
function Student() {

  return (
    <div >
      <div className='min-h-screen flex justify-end  py-2'>
        
        <div className='p-8 rounded-xl shadow-lg shadow-slate-700 w-full max-w-lg' >
        <div className=' flex bg-black '>
        <div><img src={logo} className=' h-10 w-full'/></div>
        <div className='text-2xl text-white font-bold'>Let's Get Started</div>
        </div>
          <h3 className='text-xl text-black font-semibold py-5 text-center'>People across Globe are joining us to upgrade their career with our Robust AI</h3>
          

          <form >
            <div className='mb-4'>
              <label className='block text-black'>School</label>
              <input
                type='text'
                name='first_name'
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Job Title'
                
              />
            </div>
            <div className='mb-4'>
              <label className='block text-black'>Degree</label>
              <input
                type='text'
                name='last_name'
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Company Name'
                
              />
            </div>
            <div className='mb-4'>
              <label className='block text-black'>School Location</label>
              <input
                type='text'
                name='last_name'
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Company Name'
                
              />
            </div>
            
            
            <button type='submit' className='w-full py-2 px-4 bg-yellow-500 text-black font-semibold rounded-md'>
              Finish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Student;
