import React, { useEffect, useRef, useState } from 'react';

function Counter2() {
    const [count, setCount] = useState(0);
    const lastestCount = useRef(count);

    useEffect(() => {
        lastestCount.current = count;
        setTimeout(() => {
            console.log(`You clicked ${lastestCount.current} times`);
        }, 3000);
    })

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>      
        </div>
    )
}

export default Counter2;