<template>
    <v-dialog v-model="shouldOpen">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Add members to {{ teamName }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-select
                        v-model="teamMembers"
                        label="Members"
                        hide-selected
                        item-text="name"
                        item-value="_id"
                        :items="users"
                    ></v-select>
                    <v-btn @click="onSubmit">Update Members</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    props: {
        members: {
            type: Array,
            required: true
        },
        teamName: {
            type: String,
            required: true
        },
        shouldOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            teamMembers: []
        };
    },
    computed: mapState({
        users: state => state.users.users
    }),
    methods: {
        async onSubmit() {
            await this.addMembers(this.teamMembers);
            this.$emit("closeNewMembersDialog", true);
        },
        ...mapActions({
            addMembers: "teams/addMembers"
        })
    },
    mounted() {
        this.teamMembers = this.members;
    }
};
</script>
