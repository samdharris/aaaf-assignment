<template>
    <v-list-item>
        <v-list-item-avatar>
            <v-img :src="message.author.profilePic"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="break-word">
            <v-list-item-title>{{ message.author.name }}</v-list-item-title>
            {{ message.text }}
        </v-list-item-content>
    </v-list-item>
</template>
<script>
export default {
    props: {
        message: {
            type: Object,
            required: true
        }
    }
};
</script>
<style scoped>
.break-word {
    word-break: break-all;
}
</style>
