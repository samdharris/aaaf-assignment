import { SEND_MESSAGE, CLEAR_MESSAGES } from "./chat-types";

export default {
    /**
     * Pushes a new message on to the chat list
     * @param {object} state
     * @param {object} message
     */
    [SEND_MESSAGE](state, message) {
        state.messages.push(message);
    },
    /**
     * Clears the message list of all messages
     * @param {object} state
     */
    [CLEAR_MESSAGES](state) {
        state.messages = [];
    }
};
