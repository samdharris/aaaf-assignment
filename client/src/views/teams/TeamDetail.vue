<template>
    <v-container>
        <v-row v-if="loading">
            <v-col>
                <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col class="inherit-display">
                <h1>{{ team.name }}</h1>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Edit</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Delete</span>
                </v-tooltip>
            </v-col>
            <v-col>
                <team-members
                    v-if="!loading && team.name"
                    :members="team.members"
                    :team-name="team.name"
                ></team-members>
            </v-col>
        </v-row>
        <v-dialog v-model="openDialog">
            <add-members-dialog
                v-on:closeNewMembersDialog="openDialog = false"
                v-if="!loading && team.members"
                :team-name="team.name"
                :members="team.members"
            ></add-members-dialog>
        </v-dialog>
    </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TeamMembers from "../../components/teams/TeamMembers";
export default {
    components: {
        TeamMembers
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
<style scoped>
.inherit-display {
    display: inherit;
}
</style>
