import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from './action'

const Dashboard = () => {

    const data = useSelector((state) => state.value)
    const datastore = useSelector((state) => state)

    const dispatch = useDispatch()

    console.log(datastore);

    return (
        <>
            <div>dashboard {data}</div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </>
    )
}

export default Dashboard