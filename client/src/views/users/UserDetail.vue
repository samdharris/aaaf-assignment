<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto" tile>
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
                        <v-card-subtitle class="white--text">{{
                            user.team.name
                        }}</v-card-subtitle>
                    </v-img>
                    <v-card-text>
                        <p>
                            <a :href="`mailto:${user.email}`">{{
                                user.email
                            }}</a>
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: mapState({
        user: state => state.auth.currentUser
    })
};
</script>
