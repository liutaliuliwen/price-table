import React, { useState, useEffect } from 'react';
import ChatAPI from '~/api/chat';

function FriendStatus(props: any) {
    
    const [isOnline, setIsOnline] = useState(null);
    console.log(isOnline);
    function handleStatusChange(status: any){
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
        }
    })

    if (isOnline === null) {
        return <span>Loading ...</span>;
    }
    return isOnline ? <span>Online</span> : <span>Offline</span>;
}

export default FriendStatus;