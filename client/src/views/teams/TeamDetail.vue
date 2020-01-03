<template>
    <v-container>
        <v-row v-if="loading">
            <v-col>
                <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <h1>{{ team.name }}</h1>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>
                        Members
                        <v-spacer></v-spacer>
                        <v-btn icon @click.stop="openDialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-list v-if="team.members && team.members.length">
                        <team-list-item
                            v-for="member in team.members"
                            :key="member._id"
                            :member="member"
                        ></team-list-item>
                    </v-list>
                    <v-card-subtitle v-else
                        >No members associated with this team.</v-card-subtitle
                    >
                </v-card>
            </v-col>
        </v-row>
        <add-members-dialog
            v-if="!loading && team.members"
            :should-open="openDialog"
            :team-name="team.name"
            :members="team.members"
        ></add-members-dialog>
    </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TeamListItem from "../../components/teams/TeamListItem";
import AddMembersDialog from "../../components/teams/AddMembersDialog";
export default {
    components: {
        TeamListItem,
        AddMembersDialog
    },
    computed: mapState({
        team: state => state.teams.team,
        loading: state => state.teams.loading
    }),
    data() {
        return {
            openDialog: false
        };
    },
    methods: {
        ...mapActions({
            getTeam: "teams/getTeam"
        })
    },
    mounted() {
        this.getTeam(this.$route.params.teamId);
    }
};
</script>
