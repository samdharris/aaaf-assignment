<template>
    <v-card>
        <v-card-title>
            Members
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon @click="openDialog = true" v-on="on">
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
                <span>Add Members</span>
            </v-tooltip>
        </v-card-title>
        <v-list v-if="members && members.length">
            <team-list-item
                v-for="member in members"
                :key="member._id"
                :member="member"
            ></team-list-item>
        </v-list>
        <v-card-subtitle v-else
            >No members associated with this team.</v-card-subtitle
        >

        <v-dialog v-model="openDialog">
            <add-members-dialog
                v-on:closeNewMembersDialog="openDialog = false"
                :team-name="teamName"
                :members="members"
            ></add-members-dialog>
        </v-dialog>
    </v-card>
</template>
<script>
import TeamListItem from "./TeamListItem";
import AddMembersDialog from "./AddMembersDialog";
export default {
    components: {
        TeamListItem,
        AddMembersDialog
    },
    data() {
        return {
            openDialog: false
        };
    },
    props: {
        members: {
            type: [Array, undefined],
            default: undefined
        },
        teamName: {
            type: String,
            required: true
        }
    }
};
</script>
