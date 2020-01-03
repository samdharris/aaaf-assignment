import store from "./";
import { SET_SNACKBAR } from "./modules/general/general-types";
/**
 * Helper to show a snackbar in vuex
 * @param {string} text Text to show in the snackbar
 * @param {string} color Vuetify colour type (success, error, info, warn)
 */
export function showSnackbar(text, color) {
    store.commit(
        `general/${SET_SNACKBAR}`,
        { text, color, open: true },
        { root: true }
    );
}
