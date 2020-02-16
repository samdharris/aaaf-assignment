<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar color="primary" light>
                        <v-toolbar-title class="white--text">
                            <span v-if="!documentId">Upload a Document</span>
                            <span v-else>Update Document</span>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver
                            ref="uploadDocumentForm"
                            v-slot="{ invalid, validated, passes, validate }"
                        >
                            <v-form>
                                <ValidationProvider
                                    rules="required"
                                    v-slot="{ validate, errors }"
                                >
                                    <v-file-input
                                        name="document"
                                        id="document"
                                        v-model="document"
                                        @change="validate"
                                        :error-messages="errors"
                                    ></v-file-input>
                                </ValidationProvider>
                                <div v-if="document">
                                    <div>
                                        <strong>Document Name: </strong>
                                        {{ document.name }}
                                    </div>
                                    <div>
                                        <strong>Size: </strong>
                                        {{
                                            $converter(document.size, "B", "MB")
                                        }}
                                        MB
                                    </div>
                                    <div>
                                        <strong>Type</strong>
                                        {{ document.type }}
                                    </div>
                                </div>
                                <v-btn
                                    @click="passes(onSubmit)"
                                    :loading="submitting"
                                    color="success"
                                    :disabled="invalid && validated"
                                >
                                    <span v-if="!documentId"
                                        >Upload Document</span
                                    >
                                    <span v-else>Update</span>
                                </v-btn>
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            document: null
        };
    },
    props: {
        documentId: {
            type: String,
            default: ""
        }
    },
    computed: mapState({
        teamId: state => state.teams.team._id,
        submitting: state => state.documents.submitting,
        errors: state => state.documents.errors
    }),
    methods: {
        ...mapActions({
            uploadDocument: "documents/uploadDocument",
            updateDocument: "documents/editDocument"
        }),
        async onSubmit() {
            let success = null;
            if (!this.documentId) {
                success = await this.uploadDocument({
                    document: this.document,
                    teamId: this.teamId
                });
            } else {
                success = await this.updateDocument({
                    documentId: this.documentId,
                    document: this.document
                });
            }

            if (success) {
                this.document = null;
                this.$emit("closeDocumentForm", true);
            }
        }
    },
    watch: {
        errors: {
            handler(value) {
                this.$refs.uploadDocumentForm.setErrors(value);
            }
        }
    }
};
</script>
