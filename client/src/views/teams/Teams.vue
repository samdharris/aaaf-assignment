<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Teams</h1>
                <p>An overview of all teams.</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="teams"
                    class="elevation-1"
                    :loading="loading"
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-spacer> </v-spacer>
                            <v-dialog v-model="dialog">
                                <template v-slot:activator="{ on }">
                                    <v-btn text v-on="on">
                                        <v-icon>add</v-icon>
                                        New Team
                                    </v-btn>
                                </template>
                                <new-team-form
                                    v-on:closeNewTeamForm="dialog = false"
                                ></new-team-form>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn text icon :to="`/teams/${item._id}`">
                            <v-icon small>remove_red_eye</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import NewTeamForm from "../../components/teams/NewTeamForm";
export default {
    components: { NewTeamForm },
    data() {
        return {
            dialog: false,
            headers: [
                {
                    text: "Name",
                    sortable: true,
                    value: "name"
                },
                {
                    text: "Created",
                    sortable: false,
                    value: "createdAt"
                },
                {
                    text: "Updated",
                    sortable: false,
                    value: "updatedAt"
                },
                {
                    text: "Actions",
                    sortable: false,
                    value: "action"
                }
            ]
        };
    },
    computed: {
        ...mapState({
            teams: state => state.teams.teams,
            loading: state => state.teams.loading
        })
    },
    methods: {
        ...mapActions({
            getTeams: "teams/getTeams"
        })
    },
    mounted() {
        this.getTeams();
    }
};
</script>
