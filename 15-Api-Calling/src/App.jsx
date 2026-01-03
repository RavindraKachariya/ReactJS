import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  // const data = fetch('https://picsum.photos/v2/list')
  // console.log(data);

  // async function getData() {
  //   const data = await fetch('https://picsum.photos/v2/list')
  //   console.log(data);
  // }

  // const getData = async () => {
  //   const res = await fetch('https://picsum.photos/v2/list')
  //   const data = await res.json()
  //   console.log(data);
  // }

  // const getData = async () => {
  //   const res = await axios.get('https://picsum.photos/v2/list')
  //   console.log(res);
  // }

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get('https://picsum.photos/v2/list')
    setData(res.data);
  }

  return (
    <div>
      <h1>API Calling Example</h1>
      <button onClick={getData}>Click Me</button>
      <div>
        {data.map(function (elem, idx) {
          return <h3>Hello, {elem.author} {idx}</h3>
        })}
      </div>
    </div>
  )
}

export default App