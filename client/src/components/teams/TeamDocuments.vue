<template>
    <div>
        <v-row>
            <v-col>
                <h2>Documents</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :loading="loading"
                    :headers="headers"
                    :items="documents"
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-spacer> </v-spacer>
                            <v-dialog v-model="documentsDialog">
                                <template v-slot:activator="{ on }">
                                    <v-btn text v-on="on">
                                        <v-icon>add</v-icon>
                                        New Document
                                    </v-btn>
                                </template>
                                <upload-document-form
                                    v-on:closeDocumentForm="
                                        documentsDialog = false
                                    "
                                ></upload-document-form>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn text icon>
                            <v-icon small>remove_red_eye</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import UploadDocumentForm from "../documents/UploadDocumentForm";
import { mapActions, mapState } from "vuex";
export default {
    components: {
        UploadDocumentForm
    },
    props: {
        teamId: {
            type: String
        }
    },
    data() {
        return {
            documentsDialog: false,
            headers: [
                {
                    text: "Name",
                    sortable: true,
                    value: "name"
                }
            ]
        };
    },
    watch: {
        teamId: {
            handler(value) {
                if (value) {
                    this.getDocuments(value);
                }
            }
        }
    },
    computed: mapState({
        documents: state => state.documents.documents,
        loading: state => state.documents.loading
    }),
    methods: mapActions({
        getDocuments: "documents/getDocuments"
    })
};
</script>
