import { SocketInstance } from "../../../main";

export default {
    /**
     * Connects the user to the chat server
     */
    connect: () => {
        SocketInstance.open();
    },
    /**
     * Sends the inputted message to the chat server for distribution
     * @param {object} ctx
     * @param {string} message
     */
    send: (ctx, message) => {
        const msg = {
            text: message,
            author: ctx.rootState.auth.currentUser
        };
        SocketInstance.emit("send-message", msg);
    }
};
