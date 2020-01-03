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
                    </v-img>
                    <v-card-text>
                        <p>
                            <a :href="`mailto:${user.email}`">{{
                                user.email
                            }}</a>
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
        loading: state => state.users.loading
    }),
    methods: mapActions({
        getUser: "users/getUser"
    }),
    mounted() {
        this.getUser(this.$route.params.userId);
    },
    beforeRouteUpdate(to) {
        this.getUser(to.params.userId);
    }
};
</script>
