import { create } from 'zustand'
import { useUserStore } from './useUserStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceivedUserBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;
        //check if current user is blocked
        if (user.blocked.includes(currentUser.uid)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceivedUserBlocked: false,
            })
        }
        //check if receiver is blocked
        else if (currentUser.blocked.includes(user.uid)) {
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isReceivedUserBlocked: true,
            })
        }
        else {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceivedUserBlocked: false,
            })
        }


    },
    changeBlock: () => {
        set(state => ({ ...state, isReceivedUserBlocked: !state }))
    },
    resetChat: () => {
        set({
            chatId: null,
            user: null,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
        });
    },

}))
