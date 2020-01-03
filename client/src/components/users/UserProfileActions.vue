<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon class="white--text" v-on="on">
                    <v-icon>edit</v-icon>
                </v-btn>
            </template>
            <span>Update this user.</span>
        </v-tooltip>
        <v-tooltip bottom v-if="user._id !== authUserId">
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
                >You can't enable this user as they're already enabled.</span
            >
            <span v-else>
                Enable this user.
            </span>
        </v-tooltip>
        <v-tooltip bottom v-if="user._id !== authUserId">
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
            <span v-if="user.enabled">Disable User</span>
            <span v-else>
                This user is already disabled
            </span>
        </v-tooltip>
        <v-tooltip bottom v-if="user._id !== authUserId">
            <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    class="white--text"
                    v-on="on"
                    @click="deleteUser(user._id)"
                >
                    <v-icon class="white--text">delete_forever</v-icon>
                </v-btn>
            </template>
            <span>Delete this user.</span>
        </v-tooltip>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        authUserId: {
            type: String,
            required: true
        }
    },
    methods: mapActions({
        getUser: "users/getUser",
        disableUser: "users/disableUser",
        enableUser: "users/enableUser",
        deleteUser: "users/deleteUser"
    })
};
</script>
