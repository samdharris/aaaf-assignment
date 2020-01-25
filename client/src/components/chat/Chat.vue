<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col>
                <v-card height="100%" max-width="500" class="flex-grow">
                    <v-toolbar primary dark class="align-center">
                        <v-toolbar-title>
                            Team Chat
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>minimize</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert type="warning" v-if="connecting"
                            >Connecting.</v-alert
                        >
                        <v-alert type="success" v-if="!connecting && connected"
                            >Connected.</v-alert
                        >
                        <v-list max-height="500" class="overflow-y">
                            <chat-message
                                v-for="m in messages"
                                :key="m.author._id"
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
            </v-col>
        </v-row>
    </v-container>
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
