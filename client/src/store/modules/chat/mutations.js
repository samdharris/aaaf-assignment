import { SEND_MESSAGE } from "./chat-types";

export default {
    [SEND_MESSAGE](state, message) {
        state.messages.push(message);
    }
};
