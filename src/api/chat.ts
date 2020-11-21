const ChatAPI = {
    subscribeToFriendStatus(friendId: string, handleStatusChange: any ) {
        setTimeout(() => {
            handleStatusChange({id: friendId, isOnline: true});
        }, 1300);
    },
    unsubscribeFromFriendStatus(friendId: string, handleStatusChange: any) {
        setTimeout(() => {
            handleStatusChange({id: friendId, isOnline: false});
        }, 2600);
    }
}

export default ChatAPI;