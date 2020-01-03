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
                    <v-list-item>
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
                                    <span v-if="authenticatedUser.team.name">{{
                                        authenticatedUser.team.name
                                    }}</span>
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
                <v-list-item link to="/teams">
                    <v-list-item-icon>
                        <v-icon>people</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Teams</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/users">
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
        </v-content>
    </v-app>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { RESET_SNACKBAR } from "./store/modules/general/general-types";
export default {
    name: "App",
    data() {
        return {
            drawer: true
        };
    },
    computed: {
        ...mapState({
            snackbar: state => state.general.snackbar,
            authenticatedUser: state => state.auth.currentUser,
            appName: state => state.general.appName
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
            await this.getUsers();
        }
    },
    mounted() {
        this.start();
    }
};
</script>
