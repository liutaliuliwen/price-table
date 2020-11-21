import { useState, useEffect } from 'react'
import ChatAPI from '~/api/chat';

function useFriendStatus(friendID: string) {
    const [isOnline, setIsOnline] = useState<null | boolean>(null);

    function handleStatusChange(status: {isOnline: boolean}) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    });

    return isOnline;
}

export default useFriendStatus;