<template>
    <v-data-table
        :headers="headers"
        :items="document.versions"
        class="elevation-1"
        :loading="loading"
    >
    </v-data-table>
</template>
<script>
export default {
    data() {
        return {
            headers: [
                {
                    text: "Size",
                    sortable: false,
                    value: "size"
                },
                {
                    text: "Type",
                    sortable: false,
                    value: "type"
                },
                {
                    text: "Width",
                    sortable: false,
                    value: "width"
                },
                {
                    text: "Height",
                    sortable: false,
                    value: "height"
                },
                {
                    text: "Uploaded At",
                    sortable: false,
                    value: "createdAt"
                }
            ]
        };
    },
    props: {
        document: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>
