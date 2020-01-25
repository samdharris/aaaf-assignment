<template>
    <v-container>
        <v-row v-if="loading">
            <v-col>
                <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
        </v-row>
        <v-row v-if="!loading && document">
            <v-col class="inherit-display">
                <h1>{{ document.name }}</h1>
                <v-spacer></v-spacer>
                <v-subheader v-if="latestVersion && checkedOut">
                    Document checked out by: {{ latestVersion.checkedOutBy }}
                </v-subheader>
                <document-actions-toolbar
                    :document="document"
                    v-if="!loading && canEditDocument"
                ></document-actions-toolbar>
            </v-col>
        </v-row>
        <v-row v-if="!loading">
            <v-col>
                <document-versions
                    :document="document"
                    :loading="loading"
                ></document-versions>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import DocumentVersions from "../../components/documents/DocumentVersions.vue";
import DocumentActionsToolbar from "../../components/documents/DocumentDetailActionsToolbar.vue";
export default {
    components: {
        DocumentVersions,
        DocumentActionsToolbar
    },
    computed: {
        ...mapState({
            document: state => state.documents.document,
            loading: state => state.documents.loading
        }),
        ...mapGetters({
            checkedOut: "documents/documentIsCheckedOut",
            latestVersion: "documents/latestVersion",
            canEditDocument: "documents/canEditDocument"
        })
    },
    methods: mapActions({
        getDocument: "documents/getDocument"
    }),
    mounted() {
        this.getDocument(this.$route.params.documentId);
    }
};
</script>
<style scoped>
.inherit-display {
    display: inherit;
}
</style>
