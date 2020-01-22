<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>{{ document.name }}</h1>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: mapState({
        document: state => state.documents.document
    }),
    methods: mapActions({
        getDocument: "documents/getDocument"
    }),
    mounted() {
        this.getDocument(this.$route.params.documentId);
    }
};
</script>
