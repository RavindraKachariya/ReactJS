import React from 'react'

const App = () => {

  // Method 2: Using a named function
  const btnClick = () => {
    alert('Button clicked!')
  }

  return (

    <div >
      {/* Method 1: Using an anonymous function */}
      {/* <button onClick={function () {
      alert('Button clicked!')
    }} className='p-2 bg-red-600 text-white rounded-lg m-2'>Click me</button> */}

      < button onClick={btnClick} className='p-2 bg-red-600 text-white rounded-lg m-2' > Click me</button >
    </div >
  )
}

export default App
