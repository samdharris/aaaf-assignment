<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    v-on="on"
                    :disabled="checkedOut"
                    @click="checkoutDocument(document._id)"
                >
                    <v-icon>check_circle</v-icon>
                </v-btn>
            </template>
            <span v-if="checkedOut">Document checked out!</span>
            <span v-else>Checkout document</span>
        </v-tooltip>
        <v-tooltip bottom v-if="checkedOut && canEditDocument">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>check_circle_outline</v-icon>
                </v-btn>
            </template>
            Check In document
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" :disabled="!canEditDocument">
                    <v-icon>edit</v-icon>
                </v-btn>
            </template>
            <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="deleteDocument(document._id)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </template>
            <span>Delete</span>
        </v-tooltip>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        document: {
            type: Object,
            required: true
        }
    },
    methods: mapActions({
        deleteDocument: "documents/deleteDocument",
        checkoutDocument: "documents/checkoutDocument"
    }),
    computed: mapGetters({
        checkedOut: "documents/documentIsCheckedOut",
        latestVersion: "documents/latestVersion",
        canEditDocument: "documents/canEditDocument"
    })
};
</script>
