import React, { useState } from 'react'

const App = () => {

  const [title, setTitle] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}
        className='flex flex-col gap-4 max-w-md mx-auto mt-10'>
        <input type="text"
          placeholder='Enter Your Name'
          className='border border-gray-300 rounded px-4 py-2'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
      </form>
    </div>
  )
}

export default App
