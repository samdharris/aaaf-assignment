import store from "./";
import { SET_SNACKBAR } from "./modules/general/general-types";
import { CLEAR_MESSAGES } from "./modules/chat/chat-types";
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

/**
 * Helper to clear all chat messages.
 */
export function clearChat() {
    store.commit(`chat/${CLEAR_MESSAGES}`, null, { root: true });
}

/**
 * Dispatches action to connect to the chat server.
 */
export function connectToChat() {
    store.dispatch(`chat/connect`);
}
