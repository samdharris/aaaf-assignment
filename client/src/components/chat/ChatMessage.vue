<template>
    <v-list-item>
        <v-list-item-avatar v-if="message.author">
            <v-img :src="message.author.profilePic"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="break-word">
            <v-list-item-title>
                <span v-if="message.author">{{ message.author.name }}</span>
                <span v-else>System</span>
            </v-list-item-title>
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
