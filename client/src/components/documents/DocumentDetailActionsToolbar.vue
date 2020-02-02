<template>
    <div>
        <v-tooltip bottom v-if="!checkedOut">
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
                <v-btn icon v-on="on" @click="checkinDocument(document._id)">
                    <v-icon>check_circle_outline</v-icon>
                </v-btn>
            </template>
            Check In document
        </v-tooltip>
        <v-tooltip bottom v-if="checkedOut && canEditDocument">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="documentsDialog = true">
                    <v-icon>edit</v-icon>
                </v-btn>
            </template>
            <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom v-if="checkedOut && canEditDocument">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="deleteDocument(document._id)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </template>
            <span>Delete</span>
        </v-tooltip>
        <v-dialog v-model="documentsDialog">
            <upload-document-form
                :document-id="document._id"
                v-on:closeDocumentForm="documentsDialog = false"
            ></upload-document-form>
        </v-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UploadDocumentForm from "./UploadDocumentForm.vue";
export default {
    props: {
        document: {
            type: Object,
            required: true
        }
    },
    components: {
        UploadDocumentForm
    },
    data() {
        return {
            documentsDialog: false
        };
    },
    methods: mapActions({
        deleteDocument: "documents/deleteDocument",
        checkoutDocument: "documents/checkoutDocument",
        checkinDocument: "documents/checkinDocument"
    }),
    computed: mapGetters({
        checkedOut: "documents/documentIsCheckedOut",
        latestVersion: "documents/latestVersion",
        canEditDocument: "documents/canEditDocument"
    })
};
</script>
