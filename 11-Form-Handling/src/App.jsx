import React from 'react'

const App = () => {

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  }

  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <input type="text" placeholder='Enter Your Name' className='border border-gray-300 rounded px-4 py-2' />
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
      </form>
    </div>
  )
}

export default App
