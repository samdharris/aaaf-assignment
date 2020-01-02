<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Users</h1>
                <p>An overview of all users.</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-spacer> </v-spacer>
                            <v-dialog v-model="dialog">
                                <template v-slot:activator="{ on }">
                                    <v-btn text v-on="on">
                                        <v-icon>add</v-icon>
                                        New User
                                    </v-btn>
                                </template>
                                <new-user-form
                                    v-on:closeNewUserForm="dialog = false"
                                ></new-user-form>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn text icon :to="`/users/${item._id}`">
                            <v-icon small>remove_red_eye</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import NewUserForm from "../../components/users/NewUserForm";
import { mapState, mapActions } from "vuex";
export default {
    components: {
        NewUserForm
    },
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
                    text: "Email Address",
                    sortable: true,
                    value: "email"
                },
                {
                    text: "Enabled?",
                    sortable: true,
                    value: "enabled"
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
            users: state => state.users.users
        })
    },
    methods: {
        ...mapActions({
            getUsers: "users/getUsers"
        })
    },
    mounted() {
        this.getUsers();
    }
};
</script>
