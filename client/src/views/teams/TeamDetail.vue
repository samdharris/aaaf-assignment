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
                        <v-btn icon v-on="on" @click="dialog = true">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Edit</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="deleteTeam">
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
        <team-documents></team-documents>
        <v-dialog v-model="dialog">
            <new-team-form
                v-on:closeNewTeamForm="dialog = false"
                :is-edit-mode="true"
                :team-to-edit="team"
            ></new-team-form>
        </v-dialog>
    </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NewTeamForm from "../../components/teams/NewTeamForm";
import TeamMembers from "../../components/teams/TeamMembers";
import TeamDocuments from "../../components/teams/TeamDocuments";
export default {
    components: {
        NewTeamForm,
        TeamMembers,
        TeamDocuments
    },
    computed: mapState({
        team: state => state.teams.team,
        loading: state => state.teams.loading
    }),
    data() {
        return {
            dialog: false
        };
    },
    methods: {
        ...mapActions({
            getTeam: "teams/getTeam",
            deleteTeam: "teams/deleteTeam"
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
