import React, { useState } from 'react'

const App = () => {

  const [num, setNum] = useState([10, 20, 30])

  const btnClick = () => {

    // const newNum = [...num]
    // newNum.push(40)
    // setNum(newNum)

    setNum(prev => [...prev, 40])

    // setNum(prev => prev + 1)
    // setNum(prev => prev + 1)
    // setNum(prev => prev + 1)
  }


  return (
    <div>
      <h1>{num}</h1>
      <button onClick={btnClick}>Click Me</button>
    </div>
  )
}

export default App
