<template>
    <v-app>
        <v-app-bar app color="primary" dark> </v-app-bar>

        <v-content>
            <router-view></router-view>
            <v-snackbar
                v-on:input="shouldCloseSnackbar"
                v-model="snackbar.open"
                top
                right
                :color="snackbar.color"
            >
                {{ snackbar.text }}
                <v-btn dark icon rounded @click="closeSnackbar">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-snackbar>
        </v-content>
    </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { RESET_SNACKBAR } from "./store/modules/general/general-types";
export default {
    name: "App",
    computed: mapState({
        snackbar: state => state.general.snackbar
    }),
    methods: {
        ...mapMutations({
            closeSnackbar: `general/${RESET_SNACKBAR}`
        }),

        shouldCloseSnackbar(value) {
            console.log("called");
            if (!value) {
                this.closeSnackbar();
            }
        }
    }
};
</script>
