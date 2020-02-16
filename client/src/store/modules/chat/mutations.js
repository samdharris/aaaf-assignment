import { SEND_MESSAGE, CLEAR_MESSAGES } from "./chat-types";

export default {
    [SEND_MESSAGE](state, message) {
        state.messages.push(message);
    },
    [CLEAR_MESSAGES](state) {
        state.messages = [];
    }
};
