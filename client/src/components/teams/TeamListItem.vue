<template>
    <v-list-item>
        <v-list-item-avatar center>
            <v-img :src="member.profilePic"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="title">
                {{ member.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ member.email }}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn icon>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
export default {
    props: {
        member: {
            type: Object,
            required: true
        }
    }
};
</script>
