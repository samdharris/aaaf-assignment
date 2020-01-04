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
export default {
    props: {
        documents: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
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
    }
};
</script>
