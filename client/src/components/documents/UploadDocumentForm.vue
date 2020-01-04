<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar color="primary" light>
                        <v-toolbar-title class="white--text">
                            Upload a Document
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver
                            ref="newDocumentForm"
                            v-slot="{ invalid, validated, passes, validate }"
                        >
                            <v-form>
                                <ValidationProvider
                                    rules="required"
                                    v-slot="{ validate, errors }"
                                >
                                    <v-file-input
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
                                    color="success"
                                    :disabled="invalid && validated"
                                    >Upload Document</v-btn
                                >
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            document: null
        };
    },
    methods: {
        async onSubmit() {}
    }
};
</script>
