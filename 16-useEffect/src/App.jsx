import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  function aChange() {
    console.log('A Changed');
  }

  function bChange() {
    console.log('B Changed');
  }

  useEffect(() => {
    aChange();
  }, [a]);

  useEffect(() => {
    bChange();
  }, [b]);

  return (
    <div>
      <button onClick={() => {
        setA(a + 1)
      }}>A is {a}</button>
      <button onClick={() => {
        setB(b + 1)
      }}>B is {b}</button>
    </div>
  )
}

export default App
