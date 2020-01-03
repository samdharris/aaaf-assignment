<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto" tile v-if="!loading">
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        class="white--text align-center justify-center"
                        height="200px"
                    >
                        <v-row>
                            <v-col>
                                <v-avatar profile>
                                    <img
                                        :src="user.profilePic"
                                        :alt="`${user.name}'s profile photo`"
                                    />
                                </v-avatar>
                                <v-card-title>{{ user.name }}</v-card-title>
                                <v-card-subtitle class="white--text">
                                    <span v-if="user.team">
                                        {{ user.team.name }}
                                    </span>
                                    <span v-else>No team assigned!</span>
                                </v-card-subtitle>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            icon
                                            class="white--text"
                                            v-on="on"
                                        >
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Update this user.</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="user._id !== authenticatedUser._id"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            icon
                                            class="white--text"
                                            :disabled="user.enabled"
                                            v-on="on"
                                            @click="enableUser(user._id)"
                                        >
                                            <v-icon>done</v-icon>
                                        </v-btn>
                                    </template>
                                    <span v-if="user.enabled"
                                        >You can't enable this user as they're
                                        already enabled.</span
                                    >
                                    <span v-else>
                                        Enable this user.
                                    </span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="user._id !== authenticatedUser._id"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            icon
                                            class="white--text"
                                            :disabled="!user.enabled"
                                            v-on="on"
                                            @click="disableUser(user._id)"
                                        >
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </template>
                                    <span v-if="user.enabled"
                                        >Disable User</span
                                    >
                                    <span v-else>
                                        This user is already disabled
                                    </span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="user._id !== authenticatedUser._id"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            icon
                                            class="white--text"
                                            v-on="on"
                                            @click="deleteUser(user._id)"
                                        >
                                            <v-icon class="white--text"
                                                >delete_forever</v-icon
                                            >
                                        </v-btn>
                                    </template>
                                    <span>Delete this user.</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-img>
                    <v-card-text>
                        <p>
                            <a :href="`mailto:${user.email}`">{{
                                user.email
                            }}</a>
                        </p>
                        <p v-if="user._id !== authenticatedUser._id">
                            <strong>Enabled: </strong>
                            <span
                                :class="{
                                    enabled: user.enabled,
                                    disabled: !user.enabled
                                }"
                                >{{ user.enabled }}</span
                            >
                        </p>
                    </v-card-text>
                </v-card>
                <v-progress-circular indeterminate v-else>
                </v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: mapState({
        user: state => state.users.user,
        loading: state => state.users.loading,
        authenticatedUser: state => state.auth.currentUser
    }),
    methods: mapActions({
        getUser: "users/getUser",
        disableUser: "users/disableUser",
        enableUser: "users/enableUser",
        deleteUser: "users/deleteUser"
    }),
    mounted() {
        this.getUser(this.$route.params.userId);
    },
    beforeRouteUpdate(to) {
        this.getUser(to.params.userId);
    }
};
</script>
<style scoped>
.enabled {
    color: green !important;
}
.disabled {
    color: red !important;
}
</style>
