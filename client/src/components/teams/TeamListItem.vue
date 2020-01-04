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
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon @click="removeMember(member._id)" v-on="on">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </template>
                <span>Remove from team</span>
            </v-tooltip>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
import { mapActions } from "vuex";
export default {
    props: {
        member: {
            type: Object,
            required: true
        }
    },
    methods: mapActions({
        removeMember: "teams/removeMember"
    })
};
</script>
