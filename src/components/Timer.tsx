import React, { useEffect, useState } from 'react';

function Timer() {
    const [count, setCount] = useState(0);
    console.log(count);
    useEffect(() => {
        const id = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => clearInterval(id);
    }, [count])

    return <h1>{count}</h1>
}

export default Timer;