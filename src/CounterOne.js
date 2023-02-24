import React, { useState } from 'react'

function CounterOne() {
  const [ count, setCount] = useState(0)

  const increment = () => setCount(count => count + 1)
  const decrement = () => setCount(count => count - 1)
  const reset = () => setCount(0)

  return (
    <div>
      <button   </div>
  )
}

export default CounterOne
