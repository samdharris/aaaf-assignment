import { SEND_MESSAGE } from "./chat-types";

export default {
    connect: () => {},
    send: (ctx, message) => {
        ctx.commit(SEND_MESSAGE, {
            text: message,
            author: {
                name: "Joe Bloggs",
                profilePic:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/gregkilian/128.jpg",
                _id: "5e2728ed7865083d2abed471"
            }
        });
    },
    disconnect: () => {}
};
