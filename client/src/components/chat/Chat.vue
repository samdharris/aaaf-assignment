<template>
    <v-card>
        <v-toolbar dark color="primary" class="align-center">
            <v-toolbar-title>
                Team Chat
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeChat">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-list class="overflow-y">
                <chat-message
                    v-for="(m, i) in messages"
                    :key="i"
                    :message="m"
                ></chat-message>
            </v-list>
            <v-divider></v-divider>
            <v-textarea
                v-model="messageInput"
                label="Your message"
                flat
                no-resize
                auto-grow
            >
                <template v-slot:append>
                    <v-btn icon @click="onSubmit">
                        <v-icon>send</v-icon>
                    </v-btn>
                </template>
            </v-textarea>
        </v-card-text>
    </v-card>
</template>
<script>
import ChatMessage from "./ChatMessage";
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            messageInput: ""
        };
    },
    components: {
        ChatMessage
    },
    computed: mapState({
        messages: state => state.chat.messages,
        connected: state => state.chat.connected,
        connecting: state => state.chat.connecting
    }),
    methods: {
        ...mapActions({
            send: "chat/send"
        }),
        closeChat() {
            this.$emit("closeChatWindow", true);
        },
        async onSubmit() {
            await this.send(this.messageInput);
            this.messageInput = "";
        }
    }
};
</script>

<style scoped>
.overflow-y {
    overflow-y: scroll;
}
</style>
