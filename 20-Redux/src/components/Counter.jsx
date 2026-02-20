import React from 'react'
import { useSelector } from 'react-redux'

const Counter = () => {

    const data = useSelector((state) => state.value)

    return (
        <div>Counter {data}</div>
    )
}

export default Counter