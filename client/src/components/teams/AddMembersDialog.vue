<template>
    <v-dialog v-model="shouldOpen">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Add members to {{ teamName }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-select
                        label="Members"
                        multiple
                        item-text="name"
                        item-value="_id"
                        :items="users"
                    ></v-select>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
    props: {
        teamName: {
            type: String,
            required: true
        },
        shouldOpen: {
            type: Boolean,
            default: false
        }
    },
    computed: mapState({
        users: state => state.users.users
    })
};
</script>
