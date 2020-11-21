import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    },[count])

    useEffect(() => {
        setTimeout(() => {
            console.log(`You clicked ${count} times`);
        }, 3000);
    })
   
    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on: ' + count);
        }, 3000);
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <button onClick={handleAlertClick}>
                Show Alert
            </button>
        </div>
    )
}

export default Counter;