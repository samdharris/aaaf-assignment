<template>
    <v-container>
        <v-row v-if="loading">
            <v-col>
                <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col class="inherit-display">
                <h1>{{ document.name }}</h1>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" :disabled="checkedOut">
                            <v-icon>check_circle</v-icon>
                        </v-btn>
                    </template>
                    <span v-if="checkedOut">Document checked out!</span>
                    <span v-else>Checkout document</span>
                </v-tooltip>
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

export default {
    components: {
        DocumentVersions
    },
    computed: {
        ...mapState({
            document: state => state.documents.document,
            loading: state => state.documents.loading
        }),
        ...mapGetters({
            checkedOut: "documents/documentIsCheckedOut"
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
