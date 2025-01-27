<template>
    <v-app>
        <v-navigation-drawer
            v-if="isAuthenticated"
            v-model="drawer"
            app
            clipped
        >
            <template v-slot:prepend>
                <v-list>
                    <v-list-item v-if="authenticatedUser.profilePic">
                        <v-list-item-avatar center>
                            <v-img :src="authenticatedUser.profilePic"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>
                    <v-list-group>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title class="title">
                                    {{ authenticatedUser.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <span
                                        v-if="
                                            authenticatedUser.team &&
                                                authenticatedUser.team.name
                                        "
                                        >{{ authenticatedUser.team.name }}</span
                                    >
                                    <span v-else>
                                        {{ authenticatedUser.email }}
                                    </span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            link
                            :to="`/users/${authenticatedUser._id}`"
                        >
                            <v-list-item-title>My Account</v-list-item-title>
                            <v-list-item-icon
                                ><v-icon
                                    >account_circle</v-icon
                                ></v-list-item-icon
                            >
                        </v-list-item>
                        <v-list-item link @click="logout">
                            <v-list-item-title>Logout</v-list-item-title>
                            <v-list-item-icon>
                                <v-icon>exit_to_app</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </template>

            <v-divider></v-divider>

            <v-list nav>
                <v-list-item link to="/">
                    <v-list-item-icon>
                        <v-icon>home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    link
                    :to="`/teams/${authenticatedUser.team._id}`"
                    v-if="authenticatedUser.team"
                >
                    <v-list-item-icon>
                        <v-icon>people</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Your Team</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/teams" v-if="authenticatedUser.isAdmin">
                    <v-list-item-icon>
                        <v-icon>people</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Teams</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/users" v-if="authenticatedUser.isAdmin">
                    <v-list-item-icon>
                        <v-icon>supervisor_account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Users</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left color="primary" dark v-if="isAuthenticated">
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>{{ appName }}</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <router-view></router-view>
            <v-snackbar
                v-on:input="shouldCloseSnackbar"
                v-model="snackbar.open"
                top
                right
                :color="snackbar.color"
            >
                {{ snackbar.text }}
                <v-btn dark icon rounded @click="closeSnackbar">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-snackbar>
            <v-btn
                @click="showChat = true"
                v-if="
                    isAuthenticated &&
                        authenticatedUser.team &&
                        authenticatedUser.team._id
                "
                text
                fab
                bottom
                right
                absolute
                class="primary"
            >
                <v-icon>chat</v-icon>
            </v-btn>
            <v-dialog
                persistent
                v-model="showChat"
                v-if="authenticatedUser.team && authenticatedUser.team._id"
            >
                <team-chat v-on:closeChatWindow="showChat = false"></team-chat>
            </v-dialog>
        </v-content>
        <v-footer app>
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>
</template>

<script>
import TeamChat from "./components/chat/Chat";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { RESET_SNACKBAR } from "./store/modules/general/general-types";
export default {
    name: "App",
    components: { TeamChat },
    data() {
        return {
            showChat: false,
            drawer: true
        };
    },
    computed: {
        ...mapState({
            snackbar: state => state.general.snackbar,
            authenticatedUser: state => state.auth.currentUser,
            appName: state => state.general.appName,
            chatMessages: state => state.chat.messages
        }),
        ...mapGetters({
            isAuthenticated: "auth/isAuthenticated"
        })
    },
    methods: {
        ...mapActions({
            verifyToken: "auth/verifyToken",
            getUsers: "users/getUsers",
            logout: "auth/logout"
        }),
        ...mapMutations({
            closeSnackbar: `general/${RESET_SNACKBAR}`
        }),

        shouldCloseSnackbar(value) {
            if (!value) {
                this.closeSnackbar();
            }
        },
        async start() {
            await this.verifyToken();
        }
    },
    mounted() {
        this.start();
    }
};
</script>
