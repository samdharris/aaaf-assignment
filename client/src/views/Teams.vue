<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Teams</h1>
                <p>An overview of all teams within [INSERT COMPANY HERE]</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="teams"
                    class="elevation-1"
                ></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
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
                }
            ]
        };
    },
    computed: {
        ...mapState({
            teams: state => state.teams.teams
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
