import React from 'react'

const Card = (props) => {
    console.log(props);
    return (
        <div className="card">
            <img src="https://images.unsplash.com/photo-1764257416209-e2044659503f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <h1>{props.user}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet</p>
            <button>View Profile</button>
        </div>
    )
}

export default Card
