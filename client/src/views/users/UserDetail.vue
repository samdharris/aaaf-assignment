<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto" tile :loading="loading">
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        class="white--text align-center justify-center"
                        height="200px"
                    >
                        <v-row>
                            <v-col>
                                <v-avatar profile v-if="user.profilePic">
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
                        <v-row v-if="!loading && user">
                            <v-spacer></v-spacer>
                            <v-col>
                                <user-profile-actions
                                    v-if="user._id && authenticatedUser._id"
                                    :user="user"
                                    :auth-user-id="authenticatedUser._id"
                                ></user-profile-actions>
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
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import UserProfileActions from "../../components/users/UserProfileActions.vue";

export default {
    components: {
        UserProfileActions
    },
    methods: mapActions({
        getUser: "users/getUser"
    }),
    computed: mapState({
        user: state => state.users.user,
        loading: state => state.users.loading,
        authenticatedUser: state => state.auth.currentUser
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
