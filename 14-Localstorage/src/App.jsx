import React from 'react'

const App = () => {

  // localStorage.setItem('Name', 'Ravindra Kachariya')

  // const user = localStorage.getItem('Name')
  // console.log(user);

  // localStorage.removeItem('Name')

  // localStorage.clear()

  const users = {
    name: 'Ravindra Kachariya',
    age: 18,
    email: 'ravindrakachariya@gmail.com'
  }

  console.log(users);

  // localStorage.setItem('users',users)
  
  localStorage.setItem('users', JSON.stringify(users))

  const data = JSON.parse(localStorage.getItem('users'))
  console.log(data);

  return (
    <div>

    </div>
  )
}

export default App
