import React, { useEffect, useState } from 'react';

function Greeting({name}:{name: string}) {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        console.log('effect is running.');
        document.title = 'Hello, ' + name;
    },[name]);
    return (
        <h1 className="Greeting">
            Hello, {name}
            <button onClick={() => setCounter(counter + 1)}>
                Increment
            </button>
        </h1>
    )
}

export default Greeting;