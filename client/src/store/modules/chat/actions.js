import { SEND_MESSAGE } from "./chat-types";
import { SocketInstance } from "../../../main";

export default {
    userConnected: (ctx, message) => {
        ctx.commit(SEND_MESSAGE, {
            text: message,
            author: {
                name: "Admin"
            }
        });
    },
    connect: () => {
        SocketInstance.open();
    },
    send: (ctx, message) => {
        const msg = {
            text: message,
            author: ctx.rootState.auth.currentUser
        };
        SocketInstance.emit("send-message", msg);
    },
    disconnect: () => {}
};
